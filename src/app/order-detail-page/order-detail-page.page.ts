import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import * as firebase from 'firebase';
@Component({
  selector: 'app-order-detail-page',
  templateUrl: './order-detail-page.page.html',
  styleUrls: ['./order-detail-page.page.scss'],
})
export class OrderDetailPagePage implements OnInit {
  order: {};
  constructor(private route:Router, private r: ActivatedRoute) {
    this.r.params.subscribe(params => {
      this.order = JSON.parse(params['items']);
      console.log(this.order)
    });
  }
  ngOnInit() {
  }

  DeleteOrder() {
    firebase.database().ref('orders/'+firebase.auth().currentUser.uid+'/').once('value', snap => {
    if(snap) {
      var orders: {}[] = [];
      snap.forEach(shot => {
        orders.push(shot.val());
      });
      for(var i: number = 0; i<orders.length;i++) {
        if(orders[i]['totalPrice'] == this.order['totalPrice'] && orders[i]['quantity'] == this.order['quantity'] && orders[i]['itemName'] == this.order['itemName'] &&  orders[i]['date'] == this.order['date']  && orders[i]['uid'] == this.order['uid'] ) {
          orders.splice(i,1);
        }
      }

      var updates = {};
      updates['orders/'+firebase.auth().currentUser.uid+'/'] = orders;
      firebase.database().ref().update(updates);
      this.route.navigate(['tabs/tab2'])
    } else if(!snap) {
      alert("U done fucked up boy");
    }
  })
}

}
