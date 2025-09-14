import Estado from "./estado";
import Vehiculo from "./vehiculo";

export default class SUV extends Vehiculo{

    constructor(matricula:string, estado:Estado, kilometraje:number){
        super(matricula, estado, kilometraje);
        this.tarifaBase = 80;
        this.valorCargoExtra = 0.25;
        this.valorCargoExtraSeguro = 15;
    }

    condicionCargosExtra(kmTotales: number, diasTotales: number): boolean{

        return (kmTotales>500);
    }

}