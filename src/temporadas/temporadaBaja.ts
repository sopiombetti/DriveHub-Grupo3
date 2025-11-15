import Temporada from "./temporada";

export default class TemporadaBaja implements Temporada{
    
    /**
    * Devuelve el porcentaje que varía la tarifa según la temporada.
    * @returns {number}
    */
    public getPorcentajeTarifa(): number{
        return 0.9;
    }
}