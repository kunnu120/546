import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.page.html',
  styleUrls: ['./product-detail-page.page.scss'],
})
export class ProductDetailPagePage implements OnInit {
  product: {};
  constructor(private route:Router, private r: ActivatedRoute) {
    this.r.params.subscribe(params => {
      this.product = JSON.parse(params['items']);
      console.log(this.product)
    });
  }

  ngOnInit() {
  }

}
