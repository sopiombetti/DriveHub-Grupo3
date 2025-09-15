import Reserva from "./reserva";

export default class CalculadoraTarifa {

	public calcularTarifa(reserva: Reserva): number {
		let tarifaBase = reserva.getVehiculo().getTarifaBase();
		let diasTotales = reserva.calcularDiasTotales();
		let kmTotales = reserva.calcularKmTotales()
		let cargoSeguro = reserva.getVehiculo().getValorCargoExtraSeguro();
		let cargoExtra = reserva.getVehiculo().getValorCargoExtra();
		
		let tarifa = tarifaBase * diasTotales + cargoSeguro * diasTotales;
		
		if(reserva.getVehiculo().condicionCargosExtra(kmTotales, diasTotales)){
			tarifa += cargoExtra * kmTotales;
		}

		return tarifa;
	}	
}