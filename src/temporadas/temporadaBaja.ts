import Temporada from "./temporada";

export default class TemporadaBaja implements Temporada{
    public getPorcentajeTarifa(): number{
        return 0.9;
    }
}