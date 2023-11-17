import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-scanner-qr',
  templateUrl: './scanner-qr.page.html',
  styleUrls: ['./scanner-qr.page.scss'],
})
export class ScannerQRPage implements OnInit {

  code: any;
  constructor(private barcodeScanner: BarcodeScanner) { }

  ngOnInit() {
  }

  scan() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.code = barcodeData.text;
      console.log('Barcode data: ', this.code);
    }).catch(err => {
      console.log('Error: ', err)
    })
  }
}
