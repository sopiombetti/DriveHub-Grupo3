import Temporada from "./temporada";

export default class TemporadaAlta implements Temporada{
    
    /**
    * Devuelve el porcentaje que varía la tarifa según la temporada.
    * @returns {number}
    */
    public getPorcentajeTarifa(): number{
        return 1.2;
    }
}