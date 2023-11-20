import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservarCitaPageRoutingModule } from './reservar-cita-routing.module';

import { ReservarCitaPage } from './reservar-cita.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservarCitaPageRoutingModule
  ],
  declarations: [ReservarCitaPage]
})
export class ReservarCitaPageModule {}
