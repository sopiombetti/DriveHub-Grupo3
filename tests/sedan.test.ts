import {Sedan} from "../src/vehiculos/sedan";

describe('Tests clase Sedan', () => {
    let sedan: Sedan;
    
    beforeEach(() => {
        sedan = new Sedan("456", 5);
    });

    it('Condicion cargos extra', () => {
        const resultado = sedan.condicionCargosExtra(100, 10);
        expect(resultado).toBe(true);
    });
});