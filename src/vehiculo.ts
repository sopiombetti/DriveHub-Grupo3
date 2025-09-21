import Estado from "./estado";

/**
 * Clase abstracta de un vehiculo
 * @abstract
 */
export default abstract class Vehiculo {

    protected matricula : string;
    protected estado : Estado ;
    protected kilometraje: number; 
    protected tarifaBase : number;
    protected valorCargoExtra: number;
    protected valorCargoExtraSeguro: number;

    /**
     * constructor para instanciar objetos de las clases derivadas de vehiculo
     * @param {string} matricula - matrícula única del vehiculo
     * @param {Estado} estado - determina el estado del vehiculo 
     * @param {number} kilometraje - kilometraje del vehiculo
     * 
     * Las tarifas y cargos extras se inicializan en 0
     */
    constructor(matricula:string, estado:Estado, kilometraje:number){
        this.matricula = matricula;
        this.estado = estado;
        this.kilometraje = kilometraje;
        this.tarifaBase = 0;
        this.valorCargoExtra = 0;
        this.valorCargoExtraSeguro = 0;
    }
    
    /**
     * obtiene la matrícula del vehículo
     * @returns {string} - el valor de la matrícula
     */
    public getMatricula():string{
        return this.matricula;
    }
    /*
        Con getEstado():Estado estariamos retornando el objeto Estado. 
        Tal vez deberia de ser 

            public getEstado():string{
            return this.estado.getTipoEstado(); 
            }
        Donde getTipoEstado() sea un getter de Estado
        - REVISAR
        (una vez corregido documentar)
    */
    public getEstado():Estado{
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
     * Establece el nuevo estado del vehículo
     * @param {Estado} estado - el estado del vehículo
     */
    public setEstado(estado:Estado):void {
        this.estado = estado;
    }

    /**
     * Establece el kilómetraje del vehículo
     * @param {number} km - el kilometraje del vehículo 
     */
    public setKilometraje(km:number):void {
        this.kilometraje = km;
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
     * Evalúa la condición para establecer si corresponde el cobro de cargos extras
     * @abstract
     * @param {number} kmTotales - valor de kilómetros totales recorridos
     * @param {number} diasTotales - valor de días totales
     * @returns {boolean} true si corresponde cobrar cargos extra, false en caso contrario
     */
    abstract condicionCargosExtra(kmTotales: number, diasTotales:number) : boolean;
}
