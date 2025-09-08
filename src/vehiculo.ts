import Estado from "./estado";

export default abstract class Vehiculo {

    protected matricula : string;
    protected estado : Estado ;
    protected kilometraje: number; 
    protected tarifaBase : number;
    protected valorCargoExtra: number;

    constructor(matricula:string, estado:Estado, kilometraje:number,tarifaBase:number, valorCargoExtra:number){
        this.matricula = matricula;
        this.estado = estado;
        this.kilometraje = kilometraje;
        this.tarifaBase = tarifaBase;
        this.valorCargoExtra = valorCargoExtra;
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
    abstract calcularExtra(kmTotales: number, diasTotales:number) : number;
}
