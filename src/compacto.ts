import Vehiculo from "./vehiculo";

export default class Compacto extends Vehiculo{

    calcularExtra(kmTotales: number, diasTotales: number): number {
        let promedioKilometrosPorDia = kmTotales/diasTotales;
        let cargo = this.getValorCargoExtra();
        let cargoExtra = 0;
        
        if(promedioKilometrosPorDia>100)
        {
            cargoExtra += cargo * kmTotales;
        }
        
        return cargoExtra;
    }

}