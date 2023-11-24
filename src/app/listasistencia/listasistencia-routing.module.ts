import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListasistenciaPage } from './listasistencia.page';

const routes: Routes = [
  {
    path: '',
    component: ListasistenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListasistenciaPageRoutingModule {}
