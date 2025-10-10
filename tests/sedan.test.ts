import Sedan from "../src/vehiculos/sedan";

describe('Tests clase Sedan', () => {
    let sedan: Sedan;
    let estadoMock: { getTipoEstado: jest.Mock; setTipoEstado: jest.Mock };
    
    beforeEach(() => {
        estadoMock = {
            getTipoEstado: jest.fn().mockReturnValue("Disponible"),
            setTipoEstado: jest.fn()
        };
        sedan = new Sedan("456", estadoMock as any, 5);
    });

    it('Condicion cargos extra', () => {
        const resultado = sedan.condicionCargosExtra(100, 10);
        expect(resultado).toBe(true);
    });
});