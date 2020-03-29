import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../product-detail-page/product-detail-page.page'
import * as firebase from 'firebase';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public allOrders: orders;
  constructor(private route: Router) {
    var self = this;
    firebase.database().ref('orders/'+firebase.auth().currentUser.uid+'/').once('value', snap => {
      if(snap.val()) {
        this.allOrders = snap.val()['orderList'];
      } else if(!snap.val()) {
        this.allOrders = null;
      }
    })
 /* this.order_list = [{orderID: "H454654", num_items: 69, totalPrice: 500, orderDate: new Date()},
  {orderID: "H454654", num_items: 69, totalPrice: 500, orderDate: new Date()},
  {orderID: "H454654", num_items: 69, totalPrice: 500, orderDate: new Date()},
  {orderID: "H454654", num_items: 69, totalPrice: 500, orderDate: new Date()},
  {orderID: "H454654", num_items: 69, totalPrice: 500, orderDate: new Date()}
]
*/
console.log(this.allOrders);
}
goToOrderDetail(item: any) {
  console.log(item)
  this.route.navigate(['order-detail-page', {items: JSON.stringify(item)}]);

}
}

export class orders {
  public orderList: order[];
  public currentOrder: order;
  constructor() {
    this.orderList = [];
    this.createOrder(new Date());
  }
  createOrder(orderDate: Date) {
    var tOrder: order = new order(orderDate);
    this.orderList.push(tOrder);
    this.currentOrder = this.orderList[this.orderList.length-1];
  }
  addAnItem(x: {}) {
    this.currentOrder.addAnItem(x);
    this.orderList[this.orderList.length-1] = this.currentOrder;
  }
}
export class order {
  public items: {}[];
  public totalItems: number;
  public date: Date;
  public totalPrice: number;
  constructor(orderDate: Date) {
    this.items = [];
    this.totalItems = 0;
    this.totalPrice = 0;
    this.date = orderDate;
  }
  addAnItem(x: {}) {
    this.items.push(x);
    this.totalItems++;
    this.totalPrice += x['price'];
  }
}
