import Vehiculo from "./vehiculo";

export default class Compacto extends Vehiculo{

    condicionCargosExtra(kmTotales: number, diasTotales: number): boolean {
        let promedioKilometrosPorDia = kmTotales/diasTotales;
        return((promedioKilometrosPorDia)>100);
    }
}