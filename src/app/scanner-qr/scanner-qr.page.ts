import { Component, OnInit } from '@angular/core';
import { QrCodeService } from '../servicios/qr-code.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-scanner-qr',
  templateUrl: './scanner-qr.page.html',
  styleUrls: ['./scanner-qr.page.scss'],
})
export class ScannerQRPage implements OnInit {
  qrCodeUrl: SafeUrl = '';

  constructor(private qrCodeService: QrCodeService, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getQRCode();
  }

  getQRCode() {
    const url = 'https://www.duoc.cl/alumnos/';
    this.qrCodeService.generateQRCode(url).subscribe((blob: Blob) => {
      const objectUrl = URL.createObjectURL(blob);
      this.qrCodeUrl = this.domSanitizer.bypassSecurityTrustUrl(objectUrl);
    });
  }
}
