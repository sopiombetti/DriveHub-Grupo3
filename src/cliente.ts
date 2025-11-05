import Persona from "./persona";
import Vehiculo from "./vehiculos/vehiculo";
import SolicitudReserva from "./solicitudReserva";

/**
 * Clase que representa un cliente del sistema de alquiler de vehículos.
 * @extends Persona 
 */
export default class Cliente extends Persona{


    /**
     * crea un cliente
     * @param {string} nombre - nombre del cliente 
     * @param {string} dni - documento de identidad del cliente 
     * @param {string} email - correo electrónico del cliente 
     */
    constructor(nombre: string, dni: string, email: string){
        super(nombre, dni, email);
    }

    /**
    * Solicita una reserva de un vehículo (método en proceso).
    */

    /**
     * Registra la devolución de un vehículo por parte del cliente.
     * Retorna el kilometraje del auto al ser devuelto.
     * @param {Vehiculo} vehiculo - el vehículo que devuelve el cliente
     * @returns {number} - kilometraje del vehículo al momento de la devolución
     */
    public devolverVehiculo(vehiculo: Vehiculo): number{
        return vehiculo.getKilometraje();
    }

    // En este momento el cliente le indica verbalmente al admin cual vehiculo quiere y en que fechas.
    public generarSolicitud(vehiculo:Vehiculo, fechaInicio:Date, fechaFin:Date) {
        const nuevaSolicitud = new SolicitudReserva(this,vehiculo, fechaInicio, fechaFin);
    }
}