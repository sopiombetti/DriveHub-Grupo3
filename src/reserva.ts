import Cliente from "./cliente";
import Vehiculo from "./vehiculo";

export default class Reserva{

    private cliente: Cliente;
    private vehiculo: Vehiculo;
    private fechaInicio: Date;
    private fechaFin: Date;

    constructor(cliente: Cliente, vehiculo: Vehiculo, fechaInicio: Date, fechaFin: Date){
        this.cliente = cliente;
        this.vehiculo = vehiculo;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
    }

    public getFechaInicio(): Date{
        return this.fechaInicio;
    }

    public getFechaFin(): Date{
        return this.fechaFin;
    }

    public calcularKmTotales(): number{
        let kmTotal = 0;
        kmTotal = this.cliente.devolverVehiculo(this.vehiculo) - this.vehiculo.getKilometraje();
        return kmTotal;
    }

    public calcularDiasTotales(): number{
        let dias = 0;
        const diferenciaMilisegundos = Math.abs(this.fechaFin.getTime() - this.fechaInicio.getTime()); // Obtiene la diferencia en milisegundos
        const milisegundosEnUnDia = 1000 * 60 * 60 * 24; // 1 segundo * 60 segundos * 60 minutos * 24 horas
        dias = diferenciaMilisegundos / milisegundosEnUnDia;
        return dias;
    }
}