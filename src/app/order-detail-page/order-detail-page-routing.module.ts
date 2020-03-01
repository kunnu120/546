import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderDetailPagePage } from './order-detail-page.page';

const routes: Routes = [
  {
    path: '',
    component: OrderDetailPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderDetailPagePageRoutingModule {}
