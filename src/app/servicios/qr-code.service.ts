import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class QrCodeService {

    constructor(private http: HttpClient) { }

    generateQRCode(data: string) {
        const baseUrl = 'https://api.qrserver.com/v1/create-qr-code/';
        const size = '250x250';  // Puedes cambiar el tamaño según tus necesidades
        return this.http.get(baseUrl, {
            responseType: 'blob',
            params: {
                data: data,
                size: size
            }
        });
    }
}
