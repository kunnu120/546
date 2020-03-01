import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductDetailPagePageRoutingModule } from './product-detail-page-routing.module';

import { ProductDetailPagePage } from './product-detail-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductDetailPagePageRoutingModule
  ],
  declarations: [ProductDetailPagePage]
})
export class ProductDetailPagePageModule {}
