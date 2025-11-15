import Vehiculo from "./vehiculo";

export default class SUV extends Vehiculo{
    /**
     * crea un vehiculo de tipo SUV
     * @param {string} matricula -  
     * @param {number} kilometraje - kilometraje del vehiculo
     * Las tarifas y cargos extras se inicializan según lo correspondiente a SUV.
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
        return (kmTotales>500);
    }

}