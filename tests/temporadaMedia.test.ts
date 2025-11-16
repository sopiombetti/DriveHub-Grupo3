import {TemporadaMedia} from "../src/temporadas/temporadaMedia";

describe('Test de la clase temporadaMedia', ()=> {
    let tempMedia : TemporadaMedia;

    beforeEach(()=>{
        tempMedia = new TemporadaMedia();
    });

    it('debe retornar un porcentaje del 100',() => {
        expect(tempMedia.getPorcentajeTarifa()).toBe(1);
    }
    );
})