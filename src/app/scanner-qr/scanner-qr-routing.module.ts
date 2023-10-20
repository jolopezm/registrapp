import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScannerQRPage } from './scanner-qr.page';

const routes: Routes = [
  {
    path: '',
    component: ScannerQRPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScannerQRPageRoutingModule {}
