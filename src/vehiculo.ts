import Estado from "./estado";

export default abstract class Vehiculo {

    protected matricula : string;
    protected estado : Estado ;
    protected kilometraje: number; 
    protected tarifaBase : number;
    protected valorCargoExtra: number;
    protected valorCargoExtraSeguro: number;

    constructor(matricula:string, estado:Estado, kilometraje:number){
        this.matricula = matricula;
        this.estado = estado;
        this.kilometraje = kilometraje;
        this.tarifaBase = 0;
        this.valorCargoExtra = 0;
        this.valorCargoExtraSeguro = 0;
    }
    
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
    */
    public getEstado():Estado{
        return this.estado;
    }
    public getKilometraje():number{
        return this.kilometraje;
    }
    public getTarifaBase():number{
        return this.tarifaBase;
    }
    public getValorCargoExtra():number{
        return this.valorCargoExtra;
    }
    public getValorCargoExtraSeguro(): number{
        return this.valorCargoExtraSeguro;
    }
    public setMatricula(matricula:string):void {
        this.matricula = matricula;
    }
    public setEstado(estado:Estado):void {
        this.estado = estado;
    }
    public setKilometraje(km:number):void {
        this.kilometraje = km;
    }
    public setTarifaBase(tarifaBase:number):void {
        this.tarifaBase = tarifaBase;
    }
    public setValorCargoExtra(valorCargoExtra:number):void {
        this.valorCargoExtra = valorCargoExtra;
    }
    abstract condicionCargosExtra(kmTotales: number, diasTotales:number) : number;
}
