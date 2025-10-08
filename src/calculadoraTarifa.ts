import Reserva from "./reserva";
/**
Clase que calcula la tarifa que el cliente paga por la reserva.  
*/
export default class CalculadoraTarifa {

	/**
     * metodo estatico que Calcula la tarifa final de una reserva
     * @param {Reserva} reserva a tarifar
	 * @returns {number} - monto a pagar por el cliente
     */
	public static calcularTarifa(reserva: Reserva): number {
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