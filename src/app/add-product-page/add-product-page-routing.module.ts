import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddProductPagePage } from './add-product-page.page';

const routes: Routes = [
  {
    path: '',
    component: AddProductPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddProductPagePageRoutingModule {}
