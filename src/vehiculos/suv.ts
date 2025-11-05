import Vehiculo from "./vehiculo";
/**
Representa un vehiculo de tipo SUV con sus atributos particulares.
*/
export default class SUV extends Vehiculo{
    /**
     * crea un vehiculo de tipo SUV
     * @param {string} matricula -  
     * @param {number} kilometraje - cantidad de km que marca el cuentakilometros 
     * @param {number} tarifaBase - tarifa base por alquilar un SUV. Igual para todas las instancias
     * @param {number} valorCargoExtra - cargo extra por alquilar un SUV. Igual para todas las instancias
     * @param {number} tarifaBase - cargo extra por concepto de seguro. Igual para todas las instancias
     */
    constructor(matricula:string, kilometraje:number){
        super(matricula, kilometraje);
        this.tarifaBase = 80;
        this.valorCargoExtra = 0.25;
        this.valorCargoExtraSeguro = 15;
    }

    /**
     * metodo para evular si corresponden o no aplicar cargos extra
     * @param {number} kmTotales - kilometros recorridos durante la reserva
     * @param {number} diasTotales - dias que dura la reserva

	 * @returns {boolean}
     */
    condicionCargosExtra(kmTotales: number, diasTotales: number): boolean{
        /* Recibe parametro dias pero no lo uiliza... */ 
        return (kmTotales>500);
    }

}