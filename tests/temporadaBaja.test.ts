import TemporadaBaja from "../src/temporadas/temporadaBaja";

describe('Test de la clase temporadaMedia', ()=> {
    let tempBaja : TemporadaBaja;

    beforeEach(()=>{
        tempBaja = new TemporadaBaja();
    });

    it('debe retornar un porcentaje del 90',() => {
        expect(tempBaja.getPorcentajeTarifa()).toBe(0.9);
    }
    );
})