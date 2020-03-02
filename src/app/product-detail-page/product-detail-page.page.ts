import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import * as firebase from 'firebase';
import { orders, order} from '../tab2/tab2.page';
import { Tab2Page } from '../tab2/tab2.page';
@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.page.html',
  styleUrls: ['./product-detail-page.page.scss'],
})
export class ProductDetailPagePage implements OnInit {
  product: {};
  public static Orders;
  public item: Item;
  public quantity: number;

  constructor(private route:Router, private r: ActivatedRoute) {

    this.r.params.subscribe(params => {
      this.product = JSON.parse(params['items']);
      console.log(this.product)
    });
  }

  ngOnInit() {
  }

  AddToOrder() {
    var k = [];
    ProductDetailPagePage.Orders = new orders();
    firebase.database().ref('Orders/'+firebase.auth().currentUser.uid).on('value', function(snapshot) {
      snapshot.forEach(function(cShot) {
        k.push(cShot.key);

        firebase.database().ref('Orders/'+cShot.ref.parent.toString().substring(cShot.ref.parent.toString().lastIndexOf('/'))+'/'+k[k.length-1]).on('value', function(cSnap) {
          var m = cSnap.val();
          ProductDetailPagePage.Orders = JSON.parse(m);
        });
      });
    });
    for(var i:number=0; i<this.quantity; i++) {
      ProductDetailPagePage.Orders.currentOrder.items.push(this.item);
      ProductDetailPagePage.Orders.currentOrder.totalItems++;
      ProductDetailPagePage.Orders.currentOrder.totalPrice += this.item.price;
      ProductDetailPagePage.Orders.orderList[ProductDetailPagePage.Orders.orderList.length-1] = ProductDetailPagePage.Orders.currentOrder;
    }
  }


}

export class Item {
  public name: string;
  public price: number;
  public category: string;
  public description: string;
  public photo: string;
  constructor(iname: string, iprice: number, icat: string, ides: string, iphoto: string) {
    this.name = iname;
    this.price = iprice;
    this.description = ides;
    this.photo = iphoto;
    this.category = icat;
  }
}
