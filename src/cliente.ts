import Persona from "./persona";
import Vehiculo from "./vehiculo";

export default class Cliente extends Persona{

    /**
     * La clase Cliente hereda los atributos y métodos de la clase Persona.
     * Solicita una reserva (método en proceso) y posteriormente devuelve el auto reservado.
     */

    constructor(nombre: string, dni: string, email: string){
        super(nombre, dni, email);
    }

    /**
     * El metodo devolverVehiculo, retorna el kilometraje del auto al ser entregado.
     * @param vehiculo 
     * @returns kilometraje
     */

    public devolverVehiculo(vehiculo: Vehiculo): number{
        return vehiculo.getKilometraje();
    }
}