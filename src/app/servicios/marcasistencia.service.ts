import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class MarcaAsistenciaService {
  private local!: Storage;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this.local = await this.storage.create();
  }

  async marcarAsistencia(username: string) {
    const docente = 'joseR';
    const asignatura = 'Programación de aplicaciones móviles';
    const fecha = this.obtenerFechaActual();

    const asistencias: Asistencia[] = (await this.local.get('asistencias')) || [];
    asistencias.push({ alumno: username, docente, fecha, asignatura });
    await this.local.set('asistencias', asistencias);
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
    return `${mes}/${dia}`;
  }
}

interface Asistencia {
  alumno: string;
  docente: string;
  asignatura: string;
  fecha: string;
}