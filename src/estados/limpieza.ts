import Vehiculo from "../vehiculos/vehiculo";
import Disponible from "./disponible";
import IEstado from "./estado";

export default class Limpieza implements IEstado {
   constructor(private vehiculo : Vehiculo){}

    public alquilar() {
        // alquilerException a implementar
        throw new Error();
    }  
    public ponerEnMantenimiento(){
        //mantenimientoException a implementar
        throw new Error();
    }

    public ponerEnLimpieza(){
        //limpiezaException a implementar
        throw new Error();
    }

    public ponerDisponible(){
        this.vehiculo.cambiarEstado(new Disponible(this.vehiculo));
    }

    public puedeSerAlquilado(){
        return false;
    }
}