import Vehiculo from "./vehiculo";

export default class SUV extends Vehiculo{

    calcularExtra(kmTotales: number, diasTotales: number): number {

        const cargoFijoPorSeguro = 15;
        let cargo = this.getValorCargoExtra();
        let cargoExtra = 0;
        
        cargoExtra += cargoFijoPorSeguro * diasTotales;

        if (kmTotales>500){
            cargoExtra += (kmTotales * cargo);
        }
        
        return cargoExtra;
    }

}