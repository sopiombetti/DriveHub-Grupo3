import SUV from "../src/vehiculos/suv";
import Vehiculo from "../src/vehiculos/vehiculo";
import Estado from "../src/estados/estado";

class MockEstado extends Estado {
    constructor() {
        super('Disponible'); 
    }
}

describe('Test Clase SUV', () => {
    
    let suv: SUV;
    let mockEstado: MockEstado;

    beforeEach(() => {
        mockEstado = new MockEstado();
        suv = new SUV('ABC123', mockEstado, 50000);
    });

    it('debería ser una instancia de SUV', () => {
        expect(suv).toBeInstanceOf(SUV);
    });

    it('debería ser también una instancia de Vehiculo', () => {
        expect(suv).toBeInstanceOf(Vehiculo);
    });

    it('debería inicializar las tarifas y cargos extra correctamente', () => {
        expect(suv.getTarifaBase()).toBe(80);
        expect(suv.getValorCargoExtra()).toBe(0.25);
        expect(suv.getValorCargoExtraSeguro()).toBe(15);
    });

    it('debería inicializar los parámetros heredados de Vehiculo correctamente', () => {
    expect(suv.getMatricula()).toBe('ABC123');
    expect(suv.getEstado()).toBe('Disponible');
    expect(suv.getKilometraje()).toBe(50000);
    });

    it('debería aplicar cargos extra si los kilometros recorridos superan los 500 km', () => {
        const kmTotales = 501;
        const diasTotales = 5;
        expect(suv.condicionCargosExtra(kmTotales, diasTotales)).toBe(true);
    });

    it('no debería aplicar cargos extra si los kilometros recorridos son exactamente 500 km', () => {
        const kmTotales = 500;
        const diasTotales = 5;
        expect(suv.condicionCargosExtra(kmTotales, diasTotales)).toBe(false);
    });

    it('no debería aplicar cargos extra si los kilometros recorridos son menos de 500 km', () => {
        const kmTotales = 499;
        const diasTotales = 5;
        expect(suv.condicionCargosExtra(kmTotales, diasTotales)).toBe(false);
    });

});