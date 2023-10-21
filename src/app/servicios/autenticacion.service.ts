import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

interface User {
    username: string;
    password: string;
    rol: string;  // Nuevo campo
}

@Injectable({
  providedIn: 'root'
})

export class AutenticacionService {
    public autenticado!: boolean;
    private local!: Storage;

    constructor(private storage: Storage, private route: Router) {
        this.init().then(() => {
            this.migrateUsers();  // Migrar usuarios después de inicializar
        });
    }

    async init() {
        const storage = await this.storage.create();
        this.local = storage;
    }

    async register(username: string, password: string): Promise<Boolean> {
        const users = await this.local?.get('users') || [];
        const existe = users.find((us: User) => us.username === username && us.password === password);
        
        if (existe) {
            console.log("Usuario Existente");
            return true;
        } else {
            const nuevo: User = {
                username, 
                password, 
                rol: 'D'  // Asigna 'A' por defecto al rol
            };
            users.push(nuevo);
            await this.local.set('users', users);
            console.log("Registro Exitoso");
            return false;
        }
    }

    async login(username: string, password: string): Promise<boolean> {
        const users: User[] = (await this.local.get('users')) || [];
        const user = users.find((us: User) => us.username === username && us.password === password);

        if (user) {
            this.autenticado = true;
            return true;
        }
        this.autenticado = false;
        return false;
    }

    logout() {
        this.autenticado = false;
        this.route.navigate(['/home']);
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
