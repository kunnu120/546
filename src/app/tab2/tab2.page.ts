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

  public allOrders: order[];
  constructor(private route: Router) {
    var self = this;
    firebase.database().ref('orders/'+firebase.auth().currentUser.uid+'/').once('value', snap => {
      if(snap) {
        this.allOrders = [];
        snap.forEach(shot => {
          this.allOrders.push(shot.val());
        });
      } else if(!snap) {
        this.allOrders = [];
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



  export class order {
    public quantity: number;
    public itemName: string;
    public date: Date;
    public totalPrice: number;
    public uid: string;
    constructor(orderDate: Date, itmName: string, uId: string, qnt: number, price: number) {
      this.totalPrice = price*qnt;
      this.date = orderDate;
      this.quantity = qnt;
      this.itemName = itmName;
      this.uid = uId;
    }
  }

