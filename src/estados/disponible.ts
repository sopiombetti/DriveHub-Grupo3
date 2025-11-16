import {Vehiculo} from "../vehiculos/vehiculo";
import {Alquilado} from "./alquilado";
import {IEstado} from "./estado";
import {Mantenimiento} from "./mantenimiento";

export class Disponible implements IEstado {
    
    constructor(private vehiculo : Vehiculo){}

    /**
    * Cambia de estado a Alquilado y le suma al vehiculo un alquiler.
    */
    public alquilar() {
        this.vehiculo.cambiarEstado(new Alquilado(this.vehiculo));
        this.vehiculo.sumarAlquiler();
    }  

    /**
    * Cambia de estado a Mantenimiento.
    */
    public ponerEnMantenimiento(){
        this.vehiculo.cambiarEstado(new Mantenimiento(this.vehiculo));
    }

    /**
    * Lanza una excepción al no poder cambiar a Disponible.
    * @throws {Error}
    */
    public ponerDisponible(){
        throw new Error("El vehiculo ya se encuentra disponible");
    }

}