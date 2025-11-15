import moment from "moment";
import Disponible from "../estados/disponible";
import IEstado from "../estados/estado";
import Reserva from "../reserva";

/**
 * Clase abstracta de un vehiculo
 * @abstract
 */
export default abstract class Vehiculo {

    protected matricula : string;
    protected estado : IEstado;
    protected kilometraje: number; 
    protected tarifaBase : number;
    protected valorCargoExtra: number;
    protected valorCargoExtraSeguro: number;
    protected kmDesdeUltimoMant: number;
    protected fechaUltimoMant: Date;
    protected alquileresCompletados: number;
    protected reservasConfirmadas: Array<Reserva>;
    protected cantMantenimientos: number;

    /**
     * constructor para instanciar objetos de las clases derivadas de vehiculo
     * @param {string} matricula - matrícula única del vehiculo
     * @param {number} kilometraje - kilometraje del vehiculo
     * 
     * Las tarifas y cargos extras se inicializan en 0
     */
    constructor(matricula:string, kilometraje:number){
        this.matricula = matricula;
        this.estado = new Disponible(this);
        this.kilometraje = kilometraje;
        this.tarifaBase = 0;
        this.valorCargoExtra = 0;
        this.valorCargoExtraSeguro = 0;
        this.kmDesdeUltimoMant = 0;
        this.fechaUltimoMant = moment().toDate();
        this.alquileresCompletados = 0;
        this.reservasConfirmadas = [];
        this.cantMantenimientos = 0;
    }


    /**
     * Obtiene la cantidad de mantenimientos.
     * @returns {number}
     */
    public getCantMantenimiento(): number{
        return this.cantMantenimientos;
    }

    /**
     * Suma 1 a la cantidad de mantenimientos.
     */
    public sumarCantMantenimiento(): void{
        this.cantMantenimientos++;
    }

    /**
     * Obtiene el array de reservas confirmadas.
     * @returns {Array<Reserva>}
     */
    public getReservasConfirmadas(): Array<Reserva>{
        return this.reservasConfirmadas;
    }

    /**
     * Agrega una reserva al array de reservas confirmadas.
     */
    public agregarReserva(reserva: Reserva): void{
        this.reservasConfirmadas.push(reserva);
    }

    /**
     * Obtiene los kilómetro desde el último mantenimiento.
     * @returns {number}
     */
    public getKmDesdeUltimoMant(): number{
        return this.kmDesdeUltimoMant;
    }

    /**
     * Obtiene la fecha desde el último mantenimiento.
     * @returns {Date}
     */
    public getFechaUltimoMant(): Date{
        return this.fechaUltimoMant;
    }

    /**
     * Obtiene la cantidad de alquileres completados.
     * @returns {number}
     */
    public getAlquileresCompletado(): number{
        return this.alquileresCompletados;
    }

    /**
     * Actualiza los kilómetros desde el último mantenimiento.
     * @param {number}
     */
    public setKmDesdeUltimoMant(km: number): void{
        this.kmDesdeUltimoMant = km;
    }

    /**
     * Suma los kilómetros desde el último mantenimiento.
     * @param {number}
     */
    public actualizarKmDesdeUltMant(km: number): void{
        this.kmDesdeUltimoMant += km;
    }

    /**
     * Actualiza la fecha desde el último mantenimiento.
     * @param {Date}
     */
    public setFechaUltimoMant(fecha: Date): void{
        this.fechaUltimoMant = fecha;
    }

    /**
     * Resetea a 0 la cantidad de alquileres completados desde el último mantenimiento.
     */
    public resetAlquileresCompletado(): void{
        this.alquileresCompletados = 0;
    }

    /**
     * Suma 1 a los alquileres completados.
     */
    public sumarAlquiler(): void{
        this.alquileresCompletados++;
    }
    
    /**
     * Obtiene la matrícula del vehículo.
     * @returns {string}
     */
    public getMatricula():string{
        return this.matricula;
    }

    /**
     * Obtiene el estado del vehículo.
     * @returns {IEstado}
     */
    public getEstado():IEstado{
        return this.estado; 
    }

    /**
     * Obtiene el kilometraje del vehículo.
     * @returns {number}
     */
    public getKilometraje():number{
        return this.kilometraje;
    }

    /**
     * Obtiene la tarifa base del vehículo.
     * @returns {number}
     */
    public getTarifaBase():number{
        return this.tarifaBase;
    }

    /**
     * Obtiene la tarifa para cálculo de cargos extras.
     * @returns {number}
     */
    public getValorCargoExtra():number{
        return this.valorCargoExtra;
    }

    /**
     * Obtiene la tarifa para el cálculo de cargos por seguro.
     * @returns {number}
     */
    public getValorCargoExtraSeguro(): number{
        return this.valorCargoExtraSeguro;
    }

    /**
     * Establece la matrícula del vehículo.
     * @param {string}
     */
    public setMatricula(matricula:string):void {
        this.matricula = matricula;
    }


    /**
     * Establece el kilómetraje del vehículo.
     * @param {number}
     */
    public actualizarKilometraje(km:number):void {
        this.kilometraje += km;
    }

    /**
     * Establece la tarifa base de un vehículo.
     * @param {number}
     */
    public setTarifaBase(tarifaBase:number):void {
        this.tarifaBase = tarifaBase;
    }

    /**
     * Establece la tarifa de los cargos extras de un vehículo.
     * @param {number}
     */
    public setValorCargoExtra(valorCargoExtra:number):void {
        this.valorCargoExtra = valorCargoExtra;
    }

    /**
     * Establece el nuevo estado del vehículo.
     * @param {IEstado}
     */
    public cambiarEstado(estado: IEstado): void{
        this.estado = estado;
    }

    /**
     * El vehículo se alquila.
     */
    public alquilar(): void{
        this.estado.alquilar();
    }

    /**
     * El vehículo pasa a mantenimiento.
     */
    public ponerEnMantenimiento(): void{
        this.estado.ponerEnMantenimiento();
    }

    /**
     * El vehículo pasa a disponible.
     */
    public ponerDisponible(): void{
        this.estado.ponerDisponible();
    }

    /**
     * Determina si el vehículo puede ser alquilado en las fechas solicitadas.
     * @param {Date}
     * @returns {boolean}
     */
    public puedeSerAlquilado(fechaInicioSolicitada: Date, fechaFinSolicitada: Date): boolean{
        let puedeSerAlquilado = true;
        let i = 0;
        while(puedeSerAlquilado && i < this.reservasConfirmadas.length){
            const reserva = this.reservasConfirmadas[i];
            const inicioReserva = moment(reserva.getFechaInicio());
            const finReserva = moment(reserva.getFechaFin());
            if(moment(fechaInicioSolicitada).isBefore(finReserva) && moment(fechaFinSolicitada).isAfter(inicioReserva)){
                puedeSerAlquilado = false;
            }
            i++;
        }
        return puedeSerAlquilado;
    }

    /**
     * Evalúa la condición para establecer si corresponde el cobro de cargos extras
     * @abstract
     * @param {number} kmTotales - valor de kilómetros totales recorridos
     * @param {number} diasTotales - valor de días totales
     * @returns {boolean} true si corresponde cobrar cargos extra, false en caso contrario
     */
    abstract condicionCargosExtra(kmTotales: number, diasTotales:number) : boolean;
}
