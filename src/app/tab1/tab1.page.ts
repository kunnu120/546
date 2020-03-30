import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  product_list: {}[];
  constructor(private route: Router) {
    this.product_list = [];

    firebase.database().ref('products/').once('value', snap=> {
      if(snap.exists()) {
        snap.forEach(shot => {
          this.product_list.push(shot.val());
        });
      }
    });
    console.log(this.product_list);
  }
  goToProductDetail(item: any) {
    console.log(item)
    this.route.navigate(['product-detail-page', {items: JSON.stringify(item)}]);

  }

  goToShoppingCart() {
    this.route.navigate(['shopping-cart']);
  }
  goToAddProductPage() {
    this.route.navigate(['add-product-page']);
  }

  goToLogin() {
    this.route.navigate(['login-page']);
  }

  goToLogout() {
    this.route.navigate(['login-page']);
  }

}
