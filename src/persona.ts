export abstract class Persona{

    protected nombre: string;
    protected dni: string;
    protected email: string;

    constructor(nombre: string, dni: string, email: string){
        this.nombre = nombre;
        this.dni = dni;
        this.email = email;
    }

    public getNombre(): string{
        return this.nombre;
    }

    public getDni(): string{
        return this.dni;
    }

    public getEmail(): string{
        return this.email;
    }

    public setNombre(nombre: string): void{
        this.nombre = nombre;
    }

    public setDni(dni: string): void{
        this.dni = dni;
    }

    public setEmail(email: string): void{
        this.email = email;
    }
}