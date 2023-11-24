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
  public autenticado: boolean = false;
  private local!: Storage;

  // Cambia el nombre de la propiedad a algo más descriptivo, por ejemplo, 'usuarios'
  private usuarios: User[] = [];

  // Agrega una propiedad para almacenar el índice del usuario autenticado
  private usuarioAutenticadoIndex: number | null = null;

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
    this.usuarios = (await this.local.get('users')) || [];

    // Si no hay usuarios en el almacenamiento, cargar desde el archivo JSON
    if (!this.usuarios || this.usuarios.length === 0) {
      this.getUsuarios().subscribe(usersFromJson => {
        this.usuarios = usersFromJson;
        this.local.set('users', this.usuarios);
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

  // Agregar un método para obtener el usuario autenticado directamente
  getAuthenticatedUser(): User | null {
    return this.autenticatedUser;
  }

  // Actualizar el método login para almacenar el usuario autenticado y su índice
  async login(username: string, password: string): Promise<boolean> {
    const usuario = this.usuarios.find((us: User) => us.username === username && us.password === password);

    if (usuario) {
      this.autenticado = true;
      this.autenticatedUser = usuario;
      this.usuarioAutenticadoIndex = this.usuarios.indexOf(usuario); // Almacena el índice del usuario autenticado
      return true;
    }

    this.autenticado = false;
    return false;
  }

  // Agregar un método para cerrar sesión
  logout() {
    this.autenticado = false;
    this.autenticatedUser = null; // Limpia el usuario autenticado
    this.route.navigate(['/home']);
  }

  // Agregar un método para registrar un nuevo usuario
  async register(username: string, password: string): Promise<Boolean> {
    const existe = this.usuarios.find((us: User) => us.username === username && us.password === password);

    if (existe) {
      console.log("Usuario Existente");
      return true;
    } else {
      const nuevo: User = {
        username,
        password,
        rol: 'A'  // Asigna 'A' por defecto al rol
      };
      this.usuarios.push(nuevo);
      await this.local.set('users', this.usuarios);
      console.log("Registro Exitoso");
      return false;
    }
  }

  // Agregar un método para migrar usuarios si es necesario
  async migrateUsers() {
    let updated = false;  // Variable para saber si necesitamos actualizar el storage
    for (let user of this.usuarios) {
      if (!user.rol) {
        user.rol = 'A';  // Asigna 'A' a usuarios que no tienen rol
        updated = true;
      }
    }
    if (updated) {
      await this.local.set('users', this.usuarios);  // Actualiza el storage si se hizo algún cambio
    }
  }
}
