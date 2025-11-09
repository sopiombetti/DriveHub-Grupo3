import Vehiculo from "../vehiculos/vehiculo";
import Disponible from "./disponible";
import IEstado from "./estado";
import Mantenimiento from "./mantenimiento";
import moment from "moment";

export default class Alquilado implements IEstado {
  
      constructor(private vehiculo : Vehiculo){}
 
      public alquilar() {
         // alquilerException a implementar
         throw new Error();
      }  

      public ponerEnMantenimiento(){
         //mantenimientoException a implementar
         throw new Error();
      }

      public necesitaMantenimiento(): boolean{
         const hoy = moment();
         const fin = moment(this.vehiculo.getFechaUltimoMant());
         const meses = hoy.diff(fin, "months");
         const km = this.vehiculo.getKmDesdeUltimoMant();
         const alquileres = this.vehiculo.getAlquileresCompletado();
         if(km > 10000 || meses >= 12 || alquileres === 5){
            return true;
         }
         return false;
      }
 
      public ponerEnLimpieza(){
         //limpiezaException a implementar
         throw new Error();
      }
 
      public ponerDisponible(){
         if(this.necesitaMantenimiento()){
            this.vehiculo.cambiarEstado(new Mantenimiento(this.vehiculo));
            this.vehiculo.resetAlquileresCompletado();
            this.vehiculo.setFechaUltimoMant(moment().toDate());
            this.vehiculo.setKmDesdeUltimoMant(0);
         }
         this.vehiculo.cambiarEstado(new Disponible(this.vehiculo));
      }
 
      public puedeSerAlquilado(){
         return false;
      }
}