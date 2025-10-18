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




// import moment from "moment";

// /**
//  * Retorna la temporada correspondiente a una fecha.
//  * @param fecha - fecha a analizar
//  * @returns 1 (alta), 2 (media), 3 (baja)
//  */
// export function getTemporada(fecha: Date): number {
//     const mes = moment(fecha).month(); // Devuelve 0 para enero, 11 para diciembre

//     // Alta: enero (0), febrero (1), julio (6), diciembre (11)
//     if ([0, 1, 6, 11].includes(mes)) {
//         return 1;
//     }

//     // Media: marzo (2), abril (3), mayo (4), octubre (9), noviembre (10)
//     if ([2, 3, 4, 9, 10].includes(mes)) {
//         return 2;
//     }

//     // Baja: junio (5), agosto (7), septiembre (8)
//     if ([5, 7, 8].includes(mes)) {
//         return 3;
//     }

//     // En caso de que algo falle
//     return 0;
// }
