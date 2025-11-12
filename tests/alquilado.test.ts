import Alquilado from "../src/estados/alquilado";
import { AlquilarException } from "../src/excepciones/alquilarException";
import { MantenimientoException } from "../src/excepciones/mantenimientoException";
import Vehiculo from "../src/vehiculos/vehiculo";

describe('Test Clase Alquilado',()=>{

    class MockVehiculo extends Vehiculo {
        constructor() {
            super('ABC123', 10000); 
        }

        public condicionCargosExtra(kmTotales: number, diasTotales: number): boolean {
            return false; 
        }
    }

    let alquilado: Alquilado;
    let vehiculoMock: MockVehiculo;
    
    beforeEach(() => {
        const fecha = new Date('2025-09-11T00:00:00Z');

        vehiculoMock = {
            getAlquileresCompletado: jest.fn().mockReturnValue(3),
            getKmDesdeUltimoMant: jest.fn().mockReturnValue(1000),
            getFechaUltimoMant: jest.fn().mockReturnValue(fecha)
        } as unknown as Vehiculo

        alquilado = new Alquilado(vehiculoMock);
    });

    it('debe ser una instancia de Alquilado',()=>{
        expect(alquilado).toBeInstanceOf(Alquilado);
    })

    it('debe lanzar excepcion alquilar', () => {
        expect(() => alquilado.alquilar()).toThrow(AlquilarException);
        expect(() => alquilado.alquilar()).toThrow("El vehiculo no se puede alquilar");
    })

    it('debe lanzar excepcion mantenimiento', () => {
        expect(() => alquilado.ponerEnMantenimiento()).toThrow(MantenimientoException);
        expect(() => alquilado.ponerEnMantenimiento()).toThrow("El vehiculo no puede ser enviado a mantenimiento");
    })

    it('necesita mantenimiento debería ser false', () => {
        expect(alquilado.necesitaMantenimiento()).toBe(false);
    })

})

describe('Test Clase Alquilado - Necesita Mantenimiento (cambio de fecha)',()=>{

    class MockVehiculo extends Vehiculo {
        constructor() {
            super('ABC123', 10000); 
        }

        public condicionCargosExtra(kmTotales: number, diasTotales: number): boolean {
            return false; 
        }
    }

    let alquilado: Alquilado;
    let vehiculoMock: MockVehiculo;

    beforeEach(() => {
        const fecha = new Date('2024-09-11T00:00:00Z');

        vehiculoMock = {
            getAlquileresCompletado: jest.fn().mockReturnValue(3),
            getKmDesdeUltimoMant: jest.fn().mockReturnValue(1000),
            getFechaUltimoMant: jest.fn().mockReturnValue(fecha)
        } as unknown as Vehiculo

        alquilado = new Alquilado(vehiculoMock);
    });

    it('necesita mantenimiento debería ser true', () => {
        expect(alquilado.necesitaMantenimiento()).toBe(true);
    })
})

describe('Test Clase Alquilado - Necesita Mantenimiento (cambio de alquileres completados)',()=>{

    class MockVehiculo extends Vehiculo {
        constructor() {
            super('ABC123', 10000); 
        }

        public condicionCargosExtra(kmTotales: number, diasTotales: number): boolean {
            return false; 
        }
    }

    let alquilado: Alquilado;
    let vehiculoMock: MockVehiculo;

    beforeEach(() => {
        const fecha = new Date('2025-09-11T00:00:00Z');

        vehiculoMock = {
            getAlquileresCompletado: jest.fn().mockReturnValue(5),
            getKmDesdeUltimoMant: jest.fn().mockReturnValue(1000),
            getFechaUltimoMant: jest.fn().mockReturnValue(fecha)
        } as unknown as Vehiculo

        alquilado = new Alquilado(vehiculoMock);
    });

    it('necesita mantenimiento debería ser true', () => {
        expect(alquilado.necesitaMantenimiento()).toBe(true);
    })
})

describe('Test Clase Alquilado - Necesita Mantenimiento (cambio de km)',()=>{

    class MockVehiculo extends Vehiculo {
        constructor() {
            super('ABC123', 10000); 
        }

        public condicionCargosExtra(kmTotales: number, diasTotales: number): boolean {
            return false; 
        }
    }

    let alquilado: Alquilado;
    let vehiculoMock: MockVehiculo;

    beforeEach(() => {
        const fecha = new Date('2025-09-11T00:00:00Z');

        vehiculoMock = {
            getAlquileresCompletado: jest.fn().mockReturnValue(4),
            getKmDesdeUltimoMant: jest.fn().mockReturnValue(10200),
            getFechaUltimoMant: jest.fn().mockReturnValue(fecha)
        } as unknown as Vehiculo

        alquilado = new Alquilado(vehiculoMock);
    });

    it('necesita mantenimiento debería ser true', () => {
        expect(alquilado.necesitaMantenimiento()).toBe(true);
    })
})