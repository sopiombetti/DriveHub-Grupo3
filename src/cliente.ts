import Persona from "./persona";
import Vehiculo from "./vehiculos/vehiculo";
import SolicitudReserva from "./solicitudReserva";
import Admin from "./admin";

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
    constructor(nombre: string, dni: string, email: string, private admin: Admin){
        super(nombre, dni, email);
    }


    /** 
     * Genera la solicitud de reserva y se la pasa a admin.
     * @param {Vehiculo, Date, Date}
     */
    public generarSolicitud(vehiculo:Vehiculo, fechaInicio:Date, fechaFin:Date) {
        const nuevaSolicitud = new SolicitudReserva(this,vehiculo, fechaInicio, fechaFin);

        this.admin.generarReserva(nuevaSolicitud);
    }
}