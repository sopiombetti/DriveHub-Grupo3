import Cliente from "./cliente";
import Temporada from "./temporadas/temporada";
import TemporadaMedia from "./temporadas/temporadaMedia";
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
    private temporada: Temporada;

    /** 
        * Crea una nueva reserva con cliente, vehículo y fechas de inicio y fin.
        * Almacena el kilometraje inicial del vehículo al momento de la reserva.
        * @constructor
        * @param {Cliente} cliente que realiza la reserva.
        * @param {Vehiculo} vehículo que será reservado.
        * @param {Date} fechaInicio en que comienza la reserva.
        * @param {Date} fechaFin en que finaliza la reserva.
    */
    constructor(cliente: Cliente, vehiculo: Vehiculo, fechaInicio: Date, fechaFin: Date){
        this.cliente = cliente;
        this.vehiculo = vehiculo;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.kmInicial = this.vehiculo.getKilometraje();
        this.temporada = new TemporadaMedia();
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
    * Devuelve la temporada.
    * 
    * @returns {Temporada}
    */
    public getTemporada(): Temporada{
        return this.temporada;
    }


    /**
    * Setea la temporada.
    * 
    */
    public setTemporada(temporada: Temporada): void{
        this.temporada = temporada;
    }

    
    public terminarReserva(): void{
        this.vehiculo.ponerDisponible();
        this.vehiculo.actualizarKilometraje(this.calcularKmRecorridos());
        this.vehiculo.actualizarKmDesdeUltMant(this.calcularKmRecorridos());
    }
    
    
    /**
    * Devuelve los kilómetros recorridos durante la reserva.
    * @returns {number}
    */
    public calcularKmRecorridos(): number{
        let kmRecorridos = Math.floor((Math.random() * 651) + 50);
        return kmRecorridos;
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