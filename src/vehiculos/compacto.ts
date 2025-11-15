import Vehiculo from "./vehiculo";

export default class Compacto extends Vehiculo{

    /**
     * constructor para instanciar objetos de Compacto.
     * @param {string} matricula - matrícula única del vehiculo
     * @param {number} kilometraje - kilometraje del vehiculo
     * 
     * Las tarifas y cargos extras se inicializan según lo correspondiente a Compacto.
     */
    constructor(matricula:string, kilometraje:number){
        super(matricula, kilometraje);
        this.tarifaBase = 30;
        this.valorCargoExtra = 0.15;
    }

    /**
     * Evalúa la condición para establecer si corresponde el cobro de cargos extras.
     * @param {number} kmTotales - valor de kilómetros totales recorridos.
     * @param {number} diasTotales - valor de días totales.
     * @returns {boolean} true si corresponde cobrar cargos extra, false en caso contrario.
     */
    condicionCargosExtra(kmTotales: number, diasTotales: number): boolean {
        let promedioKilometrosPorDia = kmTotales/diasTotales;
        return((promedioKilometrosPorDia)>100);
    }
}