import Temporada from "./temporada";

export default class TemporadaMedia implements Temporada{
    public getPorcentajeTarifa(): number{
        return 1;
    }
}