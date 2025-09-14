import Reserva from "./reserva";

export default class CalculadoraTarifa {

	public calcularTarifa(reserva: Reserva): number {
		return reserva.getVehiculo().getTarifaBase() * reserva.calcularDiasTotales() +
		reserva.getVehiculo().calcularExtra(reserva.calcularKmTotales(),reserva.calcularDiasTotales());
	}	
}