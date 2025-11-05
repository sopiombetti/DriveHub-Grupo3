import Vehiculo from "./vehiculo";

export default class Compacto extends Vehiculo{

    constructor(matricula:string, kilometraje:number){
        super(matricula, kilometraje);
        this.tarifaBase = 30;
        this.valorCargoExtra = 0.15;
    }

    condicionCargosExtra(kmTotales: number, diasTotales: number): boolean {
        let promedioKilometrosPorDia = kmTotales/diasTotales;
        return((promedioKilometrosPorDia)>100);
    }
}