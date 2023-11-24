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

interface Reserva {
  fecha: string;
  especialidad: string;
  doctor: string; 
  sede: string;
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
    const reservasInLocal: Reserva[] = (await this.local.get('reservas')) || [];

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

  getUsersArray(): Observable<User[]> {
    return new Observable(observer => {
      this.local.get('users').then(users => {
        const typedUsers: User[] = users || [];
        observer.next(typedUsers);
        observer.complete();
      });
    });
  }

  getReservasArray(): Observable<Reserva[]> {
    return new Observable(observer => {
      this.local.get('reservas').then(reservas => {
        const typedReservas: Reserva[] = reservas || [];
        observer.next(typedReservas);
        observer.complete();
      });
    });
  }

  // Añadir un método para obtener el rol del usuario autenticado
  getRol(): string {
    return this.autenticatedUser ? this.autenticatedUser.rol : '';
  }

  // Agregar una propiedad para almacenar el usuario autenticado
  private autenticatedUser: User | null = null;
  private autenticatedReserva: Reserva | null = null;

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

  /*
  async saveReserva(fecha: string, especialidad: string, doctor: string, sede: string): Promise<boolean> {
    const reservas: Reserva[] = (await this.local.get('reservas')) || [];
    const reserva = reservas.find((us: Reserva) => us.fecha === fecha && us.especialidad == especialidad && us.doctor == doctor && us.sede === sede);
    if (reserva) {
      this.autenticado = true;
      this.autenticatedReserva = reserva; // Almacena el usuario autenticado
      return true;
    }
    this.autenticado = false;
    return false;
  }
  */

  logout() {
    this.autenticado = false;
    this.autenticatedUser = null; // Limpia el usuario autenticado
    this.route.navigate(['/home']);
  }

  /*
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
  */

  async register(username: string, password: string): Promise<boolean> {
    const users: User[] = (await this.local?.get('users')) || [];
    // Check if the user already exists
    const existe = users.find((us: User) => us.username === username && us.password === password);
    if (existe) {
      console.log("Usuario Existente");
      return true;
    } else {
      // Create a new user object
      const nuevo: User = {
        username,
        password,
        rol: 'A'  // Asigna 'A' por defecto al rol
      };
      // Add the new user to the users array
      users.push(nuevo);
      // Save the updated users array to local storage
      await this.local.set('users', users);
      // Save the updated users array to users.json
      this.saveUsersToJson(users);
      console.log("Registro Exitoso");
      return false;
    }
  }

  async registerReserva(fecha: string, especialidad: string, doctor: string, sede: string): Promise<boolean> {
    const reservas: Reserva[] = (await this.local?.get('reservas')) || [];
    // Check if the user already exists
    const existe = reservas.find((us: Reserva) => us.fecha === fecha && us.especialidad === especialidad && us.doctor === doctor && us.sede === sede);
    if (existe) {
      console.log("reserva Existente");
      return true;
    } else {
      // Create a new user object
      const nuevo: Reserva = {
        fecha,
        especialidad,
        doctor, 
        sede
      };
      // Add the new user to the users array
      reservas.push(nuevo);
      // Save the updated users array to local storage
      await this.local.set('reservas', reservas);
      // Save the updated users array to users.json
      console.log("Registro reserva Exitoso");
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

  private saveUsersToJson(users: User[]): void {
    const usersJsonString = JSON.stringify(users);

    // Replace 'assets/data/users.json' with the correct path to your users.json file
    this.http.put('assets/data/users.json', usersJsonString).subscribe(
      response => {
        console.log('Users saved to users.json successfully', response);
      },
      error => {
        console.error('Error saving users to users.json', error);
      }
    );
  }
}
