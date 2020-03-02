import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

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

}
