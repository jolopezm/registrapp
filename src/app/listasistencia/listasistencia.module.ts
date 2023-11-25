import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ListAsistenciaPage } from './listasistencia.page';  // Asegúrate de que el nombre coincide con tu componente

@NgModule({
  declarations: [ListAsistenciaPage],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ListAsistenciaPage,  // Asegúrate de que el nombre coincide con tu componente
      }
    ]),
  ],
})
export class ListasistenciaPageModule {}