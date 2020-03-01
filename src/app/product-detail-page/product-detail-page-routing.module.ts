import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductDetailPagePage } from './product-detail-page.page';

const routes: Routes = [
  {
    path: '',
    component: ProductDetailPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductDetailPagePageRoutingModule {}
