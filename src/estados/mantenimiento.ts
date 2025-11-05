import Vehiculo from "../vehiculos/vehiculo";
import Disponible from "./disponible";
import IEstado from "./estado";
import Limpieza from "./limpieza";

export default class Mantenimiento implements IEstado {  
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
        this.vehiculo.cambiarEstado(new Limpieza(this.vehiculo));
    }

    public ponerDisponible(){
        this.vehiculo.cambiarEstado(new Disponible(this.vehiculo));
    }


    public puedeSerAlquilado(){
        return false;
    }

}