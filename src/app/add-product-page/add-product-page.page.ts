import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-add-product-page',
  templateUrl: './add-product-page.page.html',
  styleUrls: ['./add-product-page.page.scss'],
})
export class AddProductPagePage implements OnInit {
  private name: string;
  private price: number;
  private category: string;
  private photoURL: string;
  private description: string;

  constructor(private route: Router, private camera: Camera) {
    this.name = "";
    this.category = "";
    this.photoURL = "";
    this.description = "";
  }

  ngOnInit() {
  }
  async addProductToFirebase() {
    let product = {
      name: this.name,
      price: this.price,
      category: this.category,
      photoURL: this.photoURL,
      description: this.description,
      userid: firebase.auth().currentUser.uid
    }
    await firebase.database().ref('products/').once('value', snap=> {
      if(snap.exists()) {
        let products: {}[] = [];
        snap.forEach(shot => {
          products.push(shot.val());
        });
        products.push(product);
        console.log(products)
        var updates = {};
        updates['products/'] = products;
        firebase.database().ref().update(updates).then(x => {
          this.route.navigate(['tabs/tab1']);
        }).catch(err => {
          alert(JSON.stringify(err));
        });
      } else if (!snap.exists()) {
        firebase.database().ref('products/').set([product]).then(snap => {
          console.log("success");
          this.route.navigate(['tabs/tab1']);

        }).catch(err => {
          alert(JSON.stringify(err));
        });
      }
    });
  }
  async takePhotoAndUpload() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      cameraDirection: this.camera.Direction.BACK
    }

    await this.camera.getPicture(options).then(async (imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     let name = new Date().toString();
     await firebase.storage().ref('productImages/'+name).putString(base64Image, firebase.storage.StringFormat.DATA_URL, { contentType: 'image/jpeg' }).then(async snap => {
       alert("upload success");
       await firebase.storage().ref('productImages/'+name).getDownloadURL().then(url => {
         this.photoURL = url;
       })
     }).catch(err => {
       alert(JSON.stringify(err));
     })
    }, (err) => {
     // Handle error
     alert(JSON.stringify(err));
   }).catch(err => {
     alert(JSON.stringify(err));
   });
  }
}
