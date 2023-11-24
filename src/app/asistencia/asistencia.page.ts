import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { MarcaAsistenciaService } from '../servicios/marcasistencia.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: 'asistencia.page.html',
  styleUrls: ['asistencia.page.scss'],
})
export class AsistenciaPage {
  usuario = "";

  constructor(
    private router: Router,
    private auth: AutenticacionService,
    private marcaAsistenciaService: MarcaAsistenciaService
  ) {}

  confirmarAsistencia() {
    if (this.auth.autenticado) {
      const usuarioAutenticado = this.auth.getAuthenticatedUser();
      
      if (usuarioAutenticado) {
        // Obtén el nombre de usuario del objeto del usuario autenticado
        const nombreUsuario = usuarioAutenticado.username;
        this.marcaAsistenciaService.marcarAsistencia(nombreUsuario);
        this.router.navigate(['/login']);
      }
    }
  }

  volver() {
    this.router.navigate(['/login']);
  }
}