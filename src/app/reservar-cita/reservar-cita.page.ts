import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-reservar-cita',
  templateUrl: './reservar-cita.page.html',
  styleUrls: ['./reservar-cita.page.scss'],
})
export class ReservarCitaPage implements OnInit {
  reserva = {
    fecha: "",
    especialidad: "",
    doctor: "",
    sede: ""
}

  constructor(
    private auth: AutenticacionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    
  }

  confirm() {
    this.auth.registerReserva(this.reserva.fecha, this.reserva.especialidad, this.reserva.doctor, this.reserva.sede).then((res) => {
      this.router.navigate(['/asistencia']); // 
    });
}

}
