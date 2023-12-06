import { Component, OnInit } from '@angular/core';
import { MarcaAsistenciaService } from '../servicios/marcasistencia.service'; 

@Component({
  selector: 'app-listasistencia',
  templateUrl: './listasistencia.page.html',
  styleUrls: ['./listasistencia.page.scss'],
})
export class ListAsistenciaPage implements OnInit {
  asistencias: Asistencia[] = [];

  constructor(private marcaAsistenciaService: MarcaAsistenciaService) {}

  ngOnInit() {
    if (!this.cargarAsistencias) {
      console.log("Error al cargar asistencia.")
    } else {
      this.cargarAsistencias();
    }
  }

  async cargarAsistencias() {
    try {
      this.asistencias = await this.marcaAsistenciaService.obtenerAsistencias();
    } catch (error) {
      console.error('Error al cargar las asistencias', error);
      // Puedes agregar lógica adicional aquí, como mostrar un mensaje de error en la interfaz de usuario.
    }
  }
}

interface Asistencia {
  nro: number;
  alumno: string;
  docente: string;
  asignatura: string;
  fecha: string;
}