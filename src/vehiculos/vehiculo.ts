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
    protected costoMantenimiento: number;

    /**
     * constructor para instanciar objetos de las clases derivadas de vehiculo
     * @param {string} matricula - matrícula única del vehiculo
     * @param {IEstado} estado - determina el estado del vehiculo 
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
        this.costoMantenimiento = 40;
    }


    public getReservasConfirmadas(): Array<Reserva>{
        return this.reservasConfirmadas;
    }

    public agregarReserva(reserva: Reserva): void{
        this.reservasConfirmadas.push(reserva);
    }

    public getKmDesdeUltimoMant(): number{
        return this.kmDesdeUltimoMant;
    }

    public getFechaUltimoMant(): Date{
        return this.fechaUltimoMant;
    }

    public getAlquileresCompletado(): number{
        return this.alquileresCompletados;
    }

    public setKmDesdeUltimoMant(km: number): void{
        this.kmDesdeUltimoMant = km;
    }

    public actualizarKmDesdeUltMant(km: number): void{
        this.kmDesdeUltimoMant += km;
    }

    public setFechaUltimoMant(fecha: Date): void{
        this.fechaUltimoMant = fecha;
    }

    public resetAlquileresCompletado(): void{
        this.alquileresCompletados = 0;
    }

    public sumarAlquiler(): void{
        this.alquileresCompletados++;
    }
    
    /**
     * obtiene la matrícula del vehículo
     * @returns {string} - el valor de la matrícula
     */
    public getMatricula():string{
        return this.matricula;
    }

    public getEstado():IEstado{
        return this.estado; 
    }

    /**
     * Obtiene el kilometraje del vehículo
     * @returns {number} - valor del kilometraje
     */
    public getKilometraje():number{
        return this.kilometraje;
    }

    /**
     * Obtiene la tarifa base del vehículo
     * @returns {number} - valor de tarifa base
     */
    public getTarifaBase():number{
        return this.tarifaBase;
    }

    /**
     * Obtiene la tarifa para cálculo de cargos extras
     * @returns {number} - tarifa de cargos extras
     */
    public getValorCargoExtra():number{
        return this.valorCargoExtra;
    }

    /**
     * Obtiene la tarifa para el cálculo de cargos por seguro
     * @returns {number} valor para el cargo por seguro
     */
    public getValorCargoExtraSeguro(): number{
        return this.valorCargoExtraSeguro;
    }

    /**
     * Establece la matrícula del vehículo
     * @param {string} matricula - la martícula que se le asignará al vehículo 
     */
    public setMatricula(matricula:string):void {
        this.matricula = matricula;
    }


    /**
     * Establece el kilómetraje del vehículo
     * @param {number} km - el kilometraje del vehículo 
     */
    public actualizarKilometraje(km:number):void {
        this.kilometraje += km;
    }

    /**
     * Establece la tarifa base de un vehículo
     * @param {number} tarifaBase - valor de la tarifa base 
     */
    public setTarifaBase(tarifaBase:number):void {
        this.tarifaBase = tarifaBase;
    }

    /**
     * Establece la tarifa de los cargos extras de un vehículo
     * @param {number} valorCargoExtra - valor para cálculo de cargos extras
     */
    public setValorCargoExtra(valorCargoExtra:number):void {
        this.valorCargoExtra = valorCargoExtra;
    }

    /**
     * Establece el nuevo estado del vehículo
     * @param {IEstado} estado - el estado del vehículo
     */
    public cambiarEstado(estado: IEstado): void{
        this.estado = estado;
    }

    public alquilar(): void{
        this.estado.alquilar();
    }

    public ponerEnMantenimiento(): void{
        this.estado.ponerEnMantenimiento();
    }

    public ponerDisponible(): void{
        this.estado.ponerDisponible();
    }

    public puedeSerAlquilado(fechaInicioSolicitada: Date, fechaFinSolicitada: Date): boolean{
        let puedeSerAlquilado = true;
        let i = 0;
        while(puedeSerAlquilado && i < this.reservasConfirmadas.length){
            if(!moment(fechaFinSolicitada).isBefore(this.reservasConfirmadas[i].getFechaInicio()) || !moment(fechaInicioSolicitada).isAfter(this.reservasConfirmadas[i].getFechaFin())){
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
