import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ReservarCitaPage } from './reservar-cita/reservar-cita.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  enteredNames: string[] = [];

  constructor(
    private storage: Storage, 
    private platform: Platform,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private modalCtrl: ModalController

    ) {
    this.iniciarStorage();
  }

  public user = {
    usuario: "",
    password: "",
    rol: ""
  }

  public reserva = {
    fecha: "",
    especialidad: "",
    nombreDoctor: "kkk",
    sede: ""
  }

  iniciarStorage() {
    this.platform.ready().then(async () => {
      await this.storage.create();
    })
  }

  OnInit() {
    this.activatedRouter.queryParams.subscribe(() => {
      let state = this.router.getCurrentNavigation()?.extras.state;
      if (state) {
        this.user.usuario = state['user'].usuario;
        this.user.password = state['user'].password;
        this.user.rol = state['user'].rol;
      }
    })

    this.iniciarStorage();
  }
}
