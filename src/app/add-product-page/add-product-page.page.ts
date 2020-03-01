import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

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

  constructor(private route: Router) { 
    this.name = "";
    this.category = "";
    this.photoURL = "";
    this.description = "";
  }

  ngOnInit() {
  }
  addProductToFirebase() {
    let product = {
      name: this.name,
      price: this.price,
      category: this.category,
      photoURL: this.photoURL,
      description: this.description,
      userid: firebase.auth().currentUser.uid
    }
    firebase.database().ref('products/').once('value', snap=> {
      if(snap.exists()) {
        let products: {}[] = [];
        snap.forEach(shot => {
          products.push(shot.val());
        });
        products.push(product);
        console.log(products)
        var updates = {};
        updates['products/'] = products;
        firebase.database().ref().update(updates);
      } else if (!snap.exists()) {
        firebase.database().ref('products/').set([product]).then(snap => {
          console.log("success");
        });
      }
    })
    
  }
}
