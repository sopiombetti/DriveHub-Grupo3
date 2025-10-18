import Cliente from "./cliente";
import Vehiculo from "./vehiculos/vehiculo";
import moment from "moment";


/**
* Representa la asignación de un vehículo a un cliente por un período de tiempo.
* Administra las fechas, el vehículo y el cálculo de días y kilometros.
*/
export default class Reserva{
    
    private cliente: Cliente;
    private vehiculo: Vehiculo;
    private fechaInicio: Date;
    private fechaFin: Date;
    private kmInicial: number;

    /** 
        * Crea una nueva reserva con cliente, vehículo y fechas de inicio y fin.
        * Almacena el kilometraje inicial del vehículo al momento de la reserva.
        * @constructor
        * @param {Cliente} Cliente que realiza la reserva.
        * @param {Vehiculo} Vehículo que será reservado.
        * @param {Date} fechaInicio en que comienza la reserva.
        * @param {Date} fechaFin en que finaliza la reserva.
    */
    constructor(cliente: Cliente, vehiculo: Vehiculo, fechaInicio: Date, fechaFin: Date){
        this.cliente = cliente;
        this.vehiculo = vehiculo;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.kmInicial = this.vehiculo.getKilometraje();
    }
    
    /** 
    * Devuelve el vehículo reservado.
    * 
    * @returns {Vehiculo} Vehiculo
    */
    public getVehiculo(): Vehiculo{
        return this.vehiculo;
    }

    /** 
    * Devuelve el cliente que realizó la reserva.
    * 
    * @returns {Cliente} Cliente
    */
    public getCliente(): Cliente{
        return this.cliente;
    }

    /**
    * Devuelve la fecha de inicio de la reserva.
    * 
    * @returns {Date}
    */
    public getFechaInicio(): Date{
        return this.fechaInicio;
    }

    /**
    * Devuelve la fecha de finalizacion de la reserva.
    * 
    * @returns {Date} 
    */
    public getFechaFin(): Date{
        return this.fechaFin;
    }
    /**
    * Devuelve la fecha de inicio de la reserva formateada a string.
    * 
    * @returns {String} 
    */
    public getFechaInicioFormateada(): string {
        return moment(this.fechaInicio).format("DD/MM/YYYY");
    }
/**
    * Devuelve la fecha de finalizacion de la reserva formateada a string.
    * 
    * @returns {String} 
    */
    public getFechaFinFormateada(): string {
        return moment(this.fechaFin).format("DD/MM/YYYY");
    }

    /**
    * Calcula los kilómetros recorridos durante la reserva.
    * 
    * @returns {number}
    */
    public calcularKmTotales(): number{
        let kmTotal = 0;
        kmTotal = this.cliente.devolverVehiculo(this.vehiculo) - this.kmInicial;
        return kmTotal;
    }

    /**
    * Calcula el número total de días de la reserva.
    * 
    * @returns {number} 
    */
    public calcularDiasTotales(): number {
    const inicio = moment(this.fechaInicio);
    const fin = moment(this.fechaFin);

    const dias = fin.diff(inicio, "days");

    return dias;
}

}