import Estado from "../estados/estado";
import Vehiculo from "./vehiculo";

export default class Sedan extends Vehiculo{

    constructor(matricula:string, estado:Estado, kilometraje:number){
        super(matricula, estado, kilometraje);
        this.tarifaBase = 50;
        this.valorCargoExtra = 0.20;
    }

    condicionCargosExtra(kmTotales: number, diasTotales: number): boolean {
        /* Recibe parametros km y dias y no los utiliza... */
        return true;
        
    }

}