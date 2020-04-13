// import rules from 'rules';
const functions = require('firebase-functions');
const { Storage } = require('@google-cloud/storage');
const path = require('path');
const sharp = require('sharp');
const forbidden = ['ugly', 'messy', 'trash', 'body'];
const THUMB_MAX_WIDTH = 200;
const THUMB_MAX_HEIGHT = 200;
// Monitors the product title for forbidden words
exports.monitorProductTitle = functions.database.ref('products/').onUpdate((change, context) => {
    console.log(change.after.val());
    var products = change.after.val();
    var product = products[products.length - 1];
    var matcher = new RegExp(forbidden[0] + '|' + forbidden[1] + '|' + forbidden[2] + '|' + forbidden[3], 'i');
    while (product['name'].match(matcher)) {
        product['name'] = product['name'].replace(matcher, '');
    }
    console.log(product);
    products[products.length - 1] = product;
    console.log(change.after.val());
    return change.after.ref.set(products);
});
// Monitors product price to make sure the price isn't too low compared to original
exports.monitorProductPrice = functions.database.ref('products/').onUpdate((change, context) => {
    console.log(change.after.val());
    var products = change.after.val();
    var product = products[products.length - 1];
    var beforeProducts = change.before.val();
    for (let i = 0; i < beforeProducts.length; i++) {
        if (products[i]['price'] < beforeProducts[i]['price'] / 2) {
            products[i]['price'] = beforeProducts[i]['price'] / 2;
        }
    }
    return change.after.ref.set(products);
});
// Monitor firebase storage for uploading of product image, and generate a thumbnail image for the product
exports.generateThumbnail = functions.storage.object().onFinalize((obj) => {
    const fileBucket = obj.bucket; // storage bucket
    const filePath = obj.name;
    const contentType = obj.contentType;
    if (!contentType.startsWith('image/')) {
        console.log("Not Image");
        return null;
    }
    const fileName = path.basename(filePath);
    if (fileName.startsWith('thumb_')) {
        console.log("Already Thumb");
        return null;
    }
    const gcs = new Storage();
    const bucket = gcs.bucket(fileBucket);
    const metadata = {
        contentType: contentType,
    };
    const thumbFileName = `thumb_${fileName}`;
    const thumbFilePath = path.join(path.dirname(filePath), thumbFileName);
    const thumbnailUploadStream = bucket.file(thumbFilePath).createWriteStream(metadata);
    const pipeline = sharp();
    pipeline.resize(THUMB_MAX_WIDTH, THUMB_MAX_HEIGHT).pipe(thumbnailUploadStream);
    bucket.file(filePath).createReadStream().pipe(pipeline);
    return new Promise((resolve, reject) => {
        thumbnailUploadStream.on('finish', resolve).on('error', reject);
    });
});