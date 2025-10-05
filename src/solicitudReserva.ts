import Cliente from "./cliente";
import Vehiculo from "./vehiculo";

export default class SolicitudReserva {

    constructor( private cliente:Cliente ,private vehiculo: Vehiculo,private fechaInicio: Date,private fechaFin: Date) {
    }

    getVehiculo(): Vehiculo {
        return this.vehiculo;
    }
    getCliente(): Cliente {
        return this.cliente;
    }
    getFechaInicio(): Date {
        return this.fechaInicio;
    }
    getFechaFin(): Date {
        return this.fechaFin;
    }
}