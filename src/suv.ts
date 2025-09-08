import Vehiculo from "./vehiculo";
/*
Tarifa base de $80 por día. 
Aplica un cargo fijo adicional de $15 por día por
concepto de seguro y un cargo de $0.25 por cada kilómetro recorrido si se superan
los 500km en total durante el período de alquiler.
 */
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