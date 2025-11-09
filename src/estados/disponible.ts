import Vehiculo from "../vehiculos/vehiculo";
import Alquilado from "./alquilado";
import IEstado from "./estado";
import Limpieza from "./limpieza";
import Mantenimiento from "./mantenimiento";

export default class Disponible implements IEstado {
 constructor(private vehiculo : Vehiculo){}

    public alquilar() {
        this.vehiculo.cambiarEstado(new Alquilado(this.vehiculo));
        this.vehiculo.sumarAlquiler();
    }  
    public ponerEnMantenimiento(){
        this.vehiculo.cambiarEstado(new Mantenimiento(this.vehiculo));
    }

    public ponerEnLimpieza(){
        this.vehiculo.cambiarEstado(new Limpieza(this.vehiculo));
    }

    public ponerDisponible(){
        //disponibleException a implementar
        throw new Error();
    }

    public puedeSerAlquilado(){
        return true;
    }

}