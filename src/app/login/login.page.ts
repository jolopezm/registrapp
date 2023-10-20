import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router, private activatedRouter: ActivatedRoute) { }

  public alertButtons = ['OK'];
  public user = {
    usuario: "",
    password: ""
  }
  public informacion = {
    nombre: "",
    apellido: "",
    nivel: "",
    fecha: ""
  }

  ngOnInit() {
    this.activatedRouter.queryParams.subscribe(() => {
      let state = this.router.getCurrentNavigation()?.extras.state;
      if (state) {
        this.user.usuario = state['user'].usuario;
        this.user.password = state['user'].password;
        console.log(this.user);
      }
    })
  }

  public camposCompletos(): boolean {
    return !!this.informacion.nombre && 
           !!this.informacion.apellido && 
           !!this.informacion.nivel && 
           !!this.informacion.fecha;
  }

  navegarAsistencia() {
    if (this.camposCompletos()) {
      let navigationExtras: NavigationExtras = {
        state: { user: this.user }
      }
      this.router.navigate(['/asistencia'], navigationExtras);
    } else {
      // Puedes agregar aquí una alerta o notificación para informar al usuario que debe llenar todos los campos.
    }
  }
}