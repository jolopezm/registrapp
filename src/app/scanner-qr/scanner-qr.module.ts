import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScannerQRPageRoutingModule } from './scanner-qr-routing.module';

import { ScannerQRPage } from './scanner-qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScannerQRPageRoutingModule
  ],
  declarations: [ScannerQRPage]
})
export class ScannerQRPageModule {}
