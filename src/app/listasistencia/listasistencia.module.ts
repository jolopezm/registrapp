import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListasistenciaPageRoutingModule } from './listasistencia-routing.module';

import { ListasistenciaPage } from './listasistencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListasistenciaPageRoutingModule
  ],
  declarations: [ListasistenciaPage]
})
export class ListasistenciaPageModule {}
