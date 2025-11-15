import { AlquilarException } from "../excepciones/alquilarException";
import { MantenimientoException } from "../excepciones/mantenimientoException";
import Vehiculo from "../vehiculos/vehiculo";
import Disponible from "./disponible";
import IEstado from "./estado";

export default class Mantenimiento implements IEstado {  
    constructor(private vehiculo : Vehiculo){}

    /**
    * Lanza una excepción al no poder ser alquilado.
    * @throws {AlquilarException}
    */
    public alquilar() {
        throw new AlquilarException("El vehiculo no se puede alquilar");
    }  

    /**
    * Lanza una excepción al no poder ir a mantenimiento.
    * @throws {MantenimientoException}
    */
    public ponerEnMantenimiento(){
        throw new MantenimientoException("El vehiculo no puede ser enviado a mantenimiento");
    }

    /**
    * Cambia de estado a Disponible.
    */
    public ponerDisponible(){
        this.vehiculo.cambiarEstado(new Disponible(this.vehiculo));
    }

}