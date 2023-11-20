import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ScannerQRPage } from './scanner-qr/scanner-qr.page';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    canActivate: [AuthGuard],
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'api-test',
    loadChildren: () => import('./api-test/api-test.module').then(m => m.ApiTestPageModule)
  },
  {
    path: 'asistencia',
    loadChildren: () => import('./asistencia/asistencia.module').then( m => m.AsistenciaPageModule)
  },
  {
    path: 'scanner-qr',
    component: ScannerQRPage,
    loadChildren: () => import('./scanner-qr/scanner-qr.module').then(m => m.ScannerQRPageModule)
  },
  {
    path: 'reservar-cita',
    loadChildren: () => import('./reservar-cita/reservar-cita.module').then( m => m.ReservarCitaPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./error-page/error-page.module').then(m => m.ErrorPagePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
