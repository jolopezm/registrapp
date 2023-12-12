import { Component, ContentChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { QrCodeService } from '../servicios/qr-code.service';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
    public mensaje = "";
    public estado: String = "";
    public alertButtons = ['OK'];
    showModal: boolean = false;
    qrCodeURL: string | null = null;
    showQRSection: boolean = false;
    passwordType: string = "password"
    passwordShown: boolean  = false;
    isCheckboxChecked = false;

    user = {
        usuario: "",
        password: "",
        rol: ""
    };

    constructor(
        private router: Router, 
        private auth: AutenticacionService, 
        private qrCodeService: QrCodeService
    ) {}

    enviarInformacion() {
        this.auth.login(this.user.usuario, this.user.password).then(() => {
            if (this.auth.autenticado) {
                this.user.rol = this.auth.getRol(); // Obtener el rol
                let navigationExtras: NavigationExtras = {
                    state: { user: this.user }
                };
                this.router.navigate(['/login'], navigationExtras);
            } else {
                this.mensaje = "Nombre de usuario o contraseña incorrectos";
            }
        });
    }
    mostrarConsola() {
        console.log(this.user);
        if (this.user.usuario && this.user.password) {
            this.mensaje = "Usuario Conectado";
        } else {
            this.mensaje = "Usuario y contraseña deben tener algún valor";
        }
    }

    confirm() {
        if (this.auth.validatePassword(this.user.password))
            this.auth.register(this.user.usuario, this.user.password).then((res) => {
                if (res) {
                    this.estado = "Éste usuario ya existe";
                } else {
                    this.mensaje = "Se ha registrado exitosamente";
                    this.closeModal();
                }
            });
        else {
            this.estado = "Contraseña inválida";
        }
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

    returnPassword() {
        return this.user.password;
    }
}
