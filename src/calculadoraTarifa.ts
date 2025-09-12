import Reserva from "./reserva";

export default class CalculadoraTarifa {

	public calcularTarifa(reserva: Reserva): number {
		return reserva.vehiculo.getTarifaBase() * reserva.calcularDiasTotales() +
		reserva.vehiculo.calcularExtra(reserva.calcularKmTotales(),reserva.calcularDiasTotales());
	}	
}