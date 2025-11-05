import Vehiculo from "./vehiculo";

export default class Sedan extends Vehiculo{

    /**
     * crea un vehiculo de tipo Sedan
     * @param {string} matricula -  
     * @param {number} kilometraje - cantidad de km que marca el cuentakilometros 
     * @param {number} tarifaBase - tarifa base por alquilar un Sedan. Igual para todas las instancias
     * @param {number} valorCargoExtra - cargo extra por alquilar un Sedan. Igual para todas las instancias
     */
    constructor(matricula:string, kilometraje:number){
        super(matricula, kilometraje);
        this.tarifaBase = 50;
        this.valorCargoExtra = 0.20;
    }

    /**
     * Metodo para evular si corresponden o no aplicar cargos extra
     * En el caso de Sedan, siempre recibe cargos extra
     * @param {number} kmTotales - kilometros recorridos durante la reserva
     * @param {number} diasTotales - dias que dura la reserva

	 * @returns {boolean}
     */
    condicionCargosExtra(kmTotales: number, diasTotales: number): boolean {
        /* Recibe parametros km y dias y no los utiliza... */
        return true;
    }
}