import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListAsistenciaPage } from './listasistencia.page'; // Cambiado el nombre aquí

const routes: Routes = [
  {
    path: '',
    component: ListAsistenciaPage, // Cambiado el nombre aquí
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListasistenciaPageRoutingModule {}