import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../product-detail-page/product-detail-page.page'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public allOrders: orders;
  order_list: {
    orderID: string,
    num_items: number,
    totalPrice: number,
    //orderDate: Date
  }[];
  constructor(private route: Router) {
    var self = this;
    this.allOrders = new orders();
 /* this.order_list = [{orderID: "H454654", num_items: 69, totalPrice: 500, orderDate: new Date()},
  {orderID: "H454654", num_items: 69, totalPrice: 500, orderDate: new Date()},
  {orderID: "H454654", num_items: 69, totalPrice: 500, orderDate: new Date()},
  {orderID: "H454654", num_items: 69, totalPrice: 500, orderDate: new Date()},
  {orderID: "H454654", num_items: 69, totalPrice: 500, orderDate: new Date()}
]
*/
console.log(this.order_list);
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
    this.createOrder(0);
  }

createOrder(orderDate: number) {
  var tOrder: order = new order(orderDate);
  this.orderList.push(tOrder);
  this.currentOrder = this.orderList[this.orderList.length-1];
}


}
  export class order {
    public items: Item[];
    public totalItems: number;
    public date: number;
    public totalPrice: number;
    constructor(orderDate: number) {
      this.items = [];
      this.totalItems = 0;
      this.totalPrice = 0;
      this.date = orderDate;
    }
    addAnItem(x: Item) {
      this.items.push(x);
      this.totalItems++;
      this.totalPrice += x.price;
    }
  }

