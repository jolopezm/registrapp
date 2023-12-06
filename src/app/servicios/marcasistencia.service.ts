import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class MarcaAsistenciaService {
  
  asignatura = "Programación de aplicaciones móviles";
  docente = "Jose R.";
  fecha = this.obtenerFechaActual();
  private local!: Storage;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this.local = await this.storage.create();
  }

  async marcarAsistencia(username: string) {
    const docente = this.docente;
    const asignatura = this.asignatura;
    const fecha = this.fecha;

    const asistencias: Asistencia[] = (await this.local.get('asistencias')) || [];

    if (!this.isAlreadyInList(username, asistencias)) {
      // If not in the list, mark attendance and update local storage
      asistencias.push({ alumno: username, docente, fecha, asignatura });
      await this.local.set('asistencias', asistencias);
    }
  }

  private isAlreadyInList(username: string, asistencias: Asistencia[]): boolean {
    return asistencias.some(asistencia => asistencia.alumno === username);
  }

  async obtenerAsistencias() {
    try {
      return await this.local.get('asistencias') || [];
    } catch(error) {
      console.log("Error al obtener asistencias en marcarasistencia.service.ts: ", error)
    }
  }

  private obtenerFechaActual(): string {
    const now = new Date();
    const mes = ('0' + (now.getMonth() + 1)).slice(-2);
    const dia = ('0' + now.getDate()).slice(-2);
    const año = ('0' + now.getFullYear()).slice(-2)
    return `${mes}/${dia}/${año}`;
  }
}

interface Asistencia {
  alumno: string;
  docente: string;
  asignatura: string;
  fecha: string;
}