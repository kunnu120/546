import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import * as firebase from 'firebase';
import { order, orders } from '../tab2/tab2.page';
import { Tab2Page } from '../tab2/tab2.page';
@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.page.html',
  styleUrls: ['./product-detail-page.page.scss'],
})
export class ProductDetailPagePage implements OnInit {
  product: {};
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
    firebase.database().ref('orders/'+firebase.auth().currentUser.uid+'/').once('value', snap => {
      if(snap.val()) {
        var orders: orders = snap.val();
        console.log(snap.val());
        for(let i: number = 0; i<this.quantity; i++) {
          orders.currentOrder.items.push(this.product);
          orders.currentOrder.totalItems++;
          orders.currentOrder.totalPrice += this.product['price'];
          orders.currentOrder.date = new Date();
          orders.orderList[orders.orderList.length-1] = orders.currentOrder;
        }
        var updates = {};
        updates['orders/'+firebase.auth().currentUser.uid+'/'] = orders;
        firebase.database().ref().update(updates);
      } else if (!snap.val()) {
        console.log(snap.val());
        var orderz: {} = {
          orderList: [],
          currentOrder: {
            items: [],
            totalItems: this.quantity,
            totalPrice: this.quantity*this.product['price'],
            date: new Date()
          }
        };
        orderz['currentOrder']['items'].fill(this.product,0,this.quantity);
        orderz['orderList'].push(orderz['currentOrder']);
        console.log(orderz)
        firebase.database().ref('orders/'+firebase.auth().currentUser.uid+'/').set(orderz).then(x => {
          console.log("success");
        });
      }
    })
  }

  Delete() {
    firebase.database().ref('products/').once('value', snap => {
      if(snap) {
        var products: {}[] = [];
        snap.forEach(shot => {
          products.push(shot.val());
        });
        for(var i: number = 0; i<products.length;i++) {
          if(products[i]['category'] == this.product['category'] && products[i]['description'] == this.product['description'] && products[i]['name'] == this.product['name'] && products[i]['photoURL'] == this.product['photoURL'] && products[i]['price'] == this.product['price'] && products[i]['userid'] == this.product['userid']) {
            products.splice(i,1);
          }
        }

        var updates = {};
        updates['products/'] = products;
        firebase.database().ref().update(updates);
        this.route.navigate(['tabs/tab1'])
      } else if(!snap) {
        alert("U done fucked up boy");
      }
    })
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
