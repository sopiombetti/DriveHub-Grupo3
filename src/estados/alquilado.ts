import { AlquilarException } from "../excepciones/alquilarException";
import { MantenimientoException } from "../excepciones/mantenimientoException";
import Vehiculo from "../vehiculos/vehiculo";
import Disponible from "./disponible";
import IEstado from "./estado";
import Mantenimiento from "./mantenimiento";
import moment from "moment";

export default class Alquilado implements IEstado {
  
      constructor(private vehiculo : Vehiculo){}
 
      /**
      * Lanza una excepción al no poder ser alquilado.
      * @throws {AlquilarException}
      */
      public alquilar() {
         throw new AlquilarException("El vehiculo no se puede alquilar");
      }  

      /**
      * Lanza una excepción al no poder ir a mantenimiento.
      * @throws {MantenimientoException}
      */
      public ponerEnMantenimiento(){
         throw new MantenimientoException("El vehiculo no puede ser enviado a mantenimiento");
      }

      /**
      * Analiza si el vehiculo necesita mantenimiento en base a los requerimientos.
      * @returns {boolean}
      */
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
 
      /**
      * Si el vehiculo necesita mantenimiento, cambia de estado a Mantenimiento. Sino, cambia a Disponible.
      */
      public ponerDisponible(){
         if(this.necesitaMantenimiento()){
            this.vehiculo.cambiarEstado(new Mantenimiento(this.vehiculo));
            this.vehiculo.sumarCantMantenimiento();
            this.vehiculo.resetAlquileresCompletado();
            this.vehiculo.setFechaUltimoMant(moment().toDate());
            this.vehiculo.setKmDesdeUltimoMant(0);
         }
         this.vehiculo.cambiarEstado(new Disponible(this.vehiculo));
      }

}