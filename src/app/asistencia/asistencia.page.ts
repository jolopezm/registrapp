import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AutenticacionService, Reserva } from '../servicios/autenticacion.service'; // Importar el servicio


@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  reservasRealizadas: Reserva[] = [];

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
    this.auth.getReservasArray().subscribe(
      reservas => {
        this.reservasRealizadas = reservas.map(reserva => ({
          fecha: reserva.fecha,
          especialidad: reserva.especialidad,
          doctor: reserva.doctor,
          sede: reserva.sede
        }));
      },
      error => {
        console.error('Error obteniendo las reservas: ', error);
        // Handle the error as needed
      }
    );
  }

  deleteReserva(reserva: any): void {
    const index = this.reservasRealizadas.indexOf(reserva);
    if (index !== -1) {
      this.reservasRealizadas.splice(index, 1);
    }
  }
}
