import Persona from "./persona";

export default class Cliente extends Persona{

    /**
     * La clase Cliente hereda los atributos y métodos de la clase Persona.
     * Solicita una reserva (método en proceso) y posteriormente devuelve el auto reservado.
     */

    constructor(nombre: string, dni: string, email: string){
        super(nombre, dni, email);
    }

    
}