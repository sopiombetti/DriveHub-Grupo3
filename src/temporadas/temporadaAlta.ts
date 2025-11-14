import Temporada from "./temporada";

export default class TemporadaAlta implements Temporada{
    public getPorcentajeTarifa(): number{
        return 1.2;
    }
}