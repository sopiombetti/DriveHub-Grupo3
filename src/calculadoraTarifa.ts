import Reserva from "./reserva";
/**
Clase que calcula la tarifa que el cliente paga por la reserva.  
*/
export default class CalculadoraTarifa {

	/**
     * metodo estatico que calcula la tarifa final de una reserva en base a los kilometros recorridos, los dias y los cargos del tipo de vehiculo.
     * @param {Reserva} reserva a tarifar
	 * @returns {number} - monto a pagar por el cliente
     */
	public calcularTarifa(reserva: Reserva): number {
		let tarifaBase = reserva.getVehiculo().getTarifaBase();
		let diasTotales = reserva.calcularDiasTotales();
		let kmTotales = reserva.calcularKmTotales()
		let cargoSeguro = reserva.getVehiculo().getValorCargoExtraSeguro();
		let cargoExtra = reserva.getVehiculo().getValorCargoExtra();
		let tarifaBaseTemporada = tarifaBase * reserva.getTemporada().getPorcentajeTarifa();

		let tarifa = tarifaBaseTemporada * diasTotales + cargoSeguro * diasTotales;
		
		if(reserva.getVehiculo().condicionCargosExtra(kmTotales, diasTotales)){
			tarifa += cargoExtra * kmTotales;
		}

		return tarifa;
	}

}


