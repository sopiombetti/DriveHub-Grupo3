import Vehiculo from "./vehiculo";

export default class SUV extends Vehiculo{

    calcularExtra(kmTotales: number, diasTotales: number): number {

        let cargo = this.getValorCargoExtra();
        let cargoExtra = 0;
        
        cargoExtra += cargo * kmTotales;
        
        return cargoExtra;
    }

}