import TemporadaAlta from "../src/temporadas/temporadaAlta";

describe('Test de la clase temporadaMedia', ()=> {
    let tempAlta : TemporadaAlta;

    beforeEach(()=>{
        tempAlta = new TemporadaAlta();
    });

    it('debe retornar un porcentaje del 120',() => {
        expect(tempAlta.getPorcentajeTarifa()).toBe(1.2);
    }
    );
    
})