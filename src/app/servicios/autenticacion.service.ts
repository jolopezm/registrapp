import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
  username: string;
  password: string;
  rol: string;
}

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  public autenticado!: boolean;
  private local!: Storage;

  constructor(private storage: Storage, private route: Router, private http: HttpClient) {
    this.init().then(() => {
      this.migrateUsers();  // Migrar usuarios después de inicializar
    });
  }

  // Cambia la función init para manejar las promesas correctamente
  async init() {
    await this.storage.create();
    this.local = this.storage;

    // Obtener usuarios desde el almacenamiento
    const usersInLocal: User[] = (await this.local.get('users')) || [];

    // Si no hay usuarios en el almacenamiento, cargar desde el archivo JSON
    if (!usersInLocal || usersInLocal.length === 0) {
      this.getUsuarios().subscribe(usersFromJson => {
        this.local.set('users', usersFromJson);
      });
    }
  }

  getUsuarios(): Observable<User[]> {
    return this.http.get<User[]>('assets/data/users.json');
  }

  // Añadir un método para obtener el rol del usuario autenticado
  getRol(): string {
    return this.autenticatedUser ? this.autenticatedUser.rol : '';
  }

  // Agregar una propiedad para almacenar el usuario autenticado
  private autenticatedUser: User | null = null;

  // Modificar el método login para almacenar el usuario autenticado
  async login(username: string, password: string): Promise<boolean> {
    const users: User[] = (await this.local.get('users')) || [];
    const user = users.find((us: User) => us.username === username && us.password === password);
    if (user) {
      this.autenticado = true;
      this.autenticatedUser = user; // Almacena el usuario autenticado
      return true;
    }
    this.autenticado = false;
    return false;
  }

  logout() {
    this.autenticado = false;
    this.autenticatedUser = null; // Limpia el usuario autenticado
    this.route.navigate(['/home']);
  }

  async register(username: string, password: string): Promise<Boolean> {
    const users: User[] = (await this.local?.get('users')) || [];
    const existe = users.find((us: User) => us.username === username && us.password === password);

    if (existe) {
      console.log("Usuario Existente");
      return true;
    } else {
      const nuevo: User = {
        username,
        password,
        rol: 'A'  // Asigna 'A' por defecto al rol
      };
      users.push(nuevo);
      await this.local.set('users', users);
      console.log("Registro Exitoso");
      return false;
    }
  }

  async migrateUsers() {
    const users: User[] = (await this.local.get('users')) || [];
    let updated = false;  // Variable para saber si necesitamos actualizar el storage
    for (let user of users) {
      if (!user.rol) {
        user.rol = 'A';  // Asigna 'A' a usuarios que no tienen rol
        updated = true;
      }
    }
    if (updated) {
      await this.local.set('users', users);  // Actualiza el storage si se hizo algún cambio
    }
  }
}
