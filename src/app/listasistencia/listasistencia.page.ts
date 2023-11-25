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
    this.cargarAsistencias();
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
  alumno: string;
  docente: string;
  asignatura: string;
  fecha: string;
}