import {Vehiculo} from "./vehiculo";

export class Sedan extends Vehiculo{

    /**
     * crea un vehiculo de tipo Sedan.
     * @param {string} matricula -  
     * @param {number} kilometraje - kilometraje del vehiculo.
     * Las tarifas y cargos extras se inicializan según lo correspondiente a Sedan.
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
        return true;
    }
}