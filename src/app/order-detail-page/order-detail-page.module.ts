import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderDetailPagePageRoutingModule } from './order-detail-page-routing.module';

import { OrderDetailPagePage } from './order-detail-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderDetailPagePageRoutingModule
  ],
  declarations: [OrderDetailPagePage]
})
export class OrderDetailPagePageModule {}
