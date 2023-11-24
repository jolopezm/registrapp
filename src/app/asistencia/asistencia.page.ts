import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AutenticacionService } from '../servicios/autenticacion.service'; // Importar el servicio


@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  resrvasRealizadas: string[] = [];

  public user = {
    usuario: "",
    password: "",
    rol: ""
  }

  constructor(
    private router: Router, 
    private activatedRouter: ActivatedRoute, 
    private auth: AutenticacionService) { }

  ngOnInit() {
    this.activatedRouter.queryParams.subscribe(() => {
      let state = this.router.getCurrentNavigation()?.extras.state;
      if (state) {
        this.user.usuario = state['user'].usuario;
        this.user.password = state['user'].password;
        this.user.rol = state['user'].rol;
        console.log(this.user);
      }
    })
    this.fetchReservas();
  }

  private fetchReservas(): void {
    this.auth.getReservasArray().subscribe(reservas => {
      this.resrvasRealizadas = reservas.map(reservas => reservas.especialidad);
    });
  }
}
