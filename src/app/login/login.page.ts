import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QrCodeService } from '../servicios/qr-code.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  showModal: boolean = false;
  qrCodeURL: string | null = null;
  showQRSection: boolean = false;

  constructor(private router: Router, private activatedRouter: ActivatedRoute, private qrCodeService: QrCodeService) { }

  public alertButtons = ['OK'];
  public user = {
    usuario: "",
    password: ""
  }
  public informacion = {
    nombre: "",
    apellido: "",
    nivel: "",
    fecha: ""
  }

  ngOnInit() {
    this.activatedRouter.queryParams.subscribe(() => {
      let state = this.router.getCurrentNavigation()?.extras.state;
      if (state) {
        this.user.usuario = state['user'].usuario;
        this.user.password = state['user'].password;
        console.log(this.user);
      }
    })
  }

  public camposCompletos(): boolean {
    return !!this.informacion.nombre && 
           !!this.informacion.apellido && 
           !!this.informacion.nivel && 
           !!this.informacion.fecha;
  }

  showQRSectionFunc() {
    this.generateMyQRCode();
    this.showQRSection = true;
  }

  openModal() {
      this.generateMyQRCode();
      this.showModal = true;
  }

  closeModal() {
      this.showModal = false;
  }

  resetModal() {
      this.showModal = false;
      this.showQRSection = false;
      this.qrCodeURL = null;
  }

  generateMyQRCode() {
      const myData = 'https://www.duoc.cl/alumnos/';
      this.qrCodeService.generateQRCode(myData).subscribe(response => {
          this.qrCodeURL = URL.createObjectURL(response);
      });
  }
  modalDismissed() {
    this.showModal = false;
    this.showQRSection = false;
    this.qrCodeURL = null;
  }
}