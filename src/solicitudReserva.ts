import Cliente from "./cliente";
import Vehiculo from "./vehiculos/vehiculo";

export default class SolicitudReserva {

    constructor( private cliente:Cliente ,private vehiculo: Vehiculo,private fechaInicio: Date,private fechaFin: Date) {
    }

    /**
     * Obtiene el vehículo solicitado.
     * @returns {Vehiculo}
     */
    getVehiculo(): Vehiculo {
        return this.vehiculo;
    }

    /**
     * Obtiene el cliente que solicita.
     * @returns {Cliente}
     */
    getCliente(): Cliente {
        return this.cliente;
    }

    /**
     * Obtiene la fecha de inicio solicitada.
     * @returns {Date}
     */
    getFechaInicio(): Date {
        return this.fechaInicio;
    }

    /**
     * Obtiene la fecha de fin solicitada.
     * @returns {Date}
     */
    getFechaFin(): Date {
        return this.fechaFin;
    }
}