import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  order_list: {
    orderID: string,
    num_items: number,
    totalPrice: number,
    orderDate: Date
  }[];
  constructor(private route: Router) {
  this.order_list = [{orderID: "H454654", num_items: 69, totalPrice: 500, orderDate: new Date()},
  {orderID: "H454654", num_items: 69, totalPrice: 500, orderDate: new Date()},
  {orderID: "H454654", num_items: 69, totalPrice: 500, orderDate: new Date()},
  {orderID: "H454654", num_items: 69, totalPrice: 500, orderDate: new Date()},
  {orderID: "H454654", num_items: 69, totalPrice: 500, orderDate: new Date()}
]
console.log(this.order_list);
} 
goToOrderDetail(item: any) {
  console.log(item)
  this.route.navigate(['order-detail-page', {items: JSON.stringify(item)}]);

}
}
