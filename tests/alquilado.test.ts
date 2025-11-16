import moment from "moment";
import {Alquilado} from "../src/estados/alquilado";
import { AlquilarException } from "../src/excepciones/alquilarException";
import { MantenimientoException } from "../src/excepciones/mantenimientoException";
import {Vehiculo} from "../src/vehiculos/vehiculo";
import {Disponible} from "../src/estados/disponible";
import {Mantenimiento} from "../src/estados/mantenimiento";

describe('Test Clase Alquilado',()=>{
    let vehiculoMock: jest.Mocked<Vehiculo>;
    let estadoAlquilado: Alquilado;

    beforeEach(() => {
        const fecha = new Date('2024-09-11T00:00:00Z');
        vehiculoMock : jest.mocked<Vehiculo>;

        vehiculoMock = {
            getFechaUltimoMant: jest.fn(),
            getKmDesdeUltimoMant: jest.fn(),
            getAlquileresCompletado: jest.fn(),
            cambiarEstado: jest.fn(),
            resetAlquileresCompletado: jest.fn(),
            setFechaUltimoMant: jest.fn(),
            setKmDesdeUltimoMant: jest.fn(),
            sumarCantMantenimiento: jest.fn()
            } as unknown as jest.Mocked<Vehiculo>;

        estadoAlquilado = new Alquilado(vehiculoMock);
    });

    it('debe ser una instancia de Alquilado',()=>{
        expect(estadoAlquilado).toBeInstanceOf(Alquilado);
    })

    it('debe lanzar una excepcion al intentar alquilar', () => {
        expect(() => estadoAlquilado.alquilar()).toThrow(AlquilarException);
        expect(() => estadoAlquilado.alquilar()).toThrow("El vehiculo no se puede alquilar");
    })

    it('debe lanzar una excepcion al intentar poner en mantenimiento', () => {
        expect(() => estadoAlquilado.ponerEnMantenimiento()).toThrow(MantenimientoException);
        expect(() => estadoAlquilado.ponerEnMantenimiento()).toThrow("El vehiculo no puede ser enviado a mantenimiento");
    })

    describe("necesitaMantenimiento()", () => {
    
        it("Debe retornar TRUE si tiene mas de 10,000 km", () => {
        vehiculoMock.getKmDesdeUltimoMant.mockReturnValue(10001);
        vehiculoMock.getFechaUltimoMant.mockReturnValue(moment().toDate());
        vehiculoMock.getAlquileresCompletado.mockReturnValue(0);

        expect(estadoAlquilado.necesitaMantenimiento()).toBe(true);
        });

        it("Debe retornar TRUE si pasaron 12 meses o mas", () => {
        vehiculoMock.getKmDesdeUltimoMant.mockReturnValue(0);
        vehiculoMock.getFechaUltimoMant.mockReturnValue(moment().subtract(12, 'months').toDate());
        vehiculoMock.getAlquileresCompletado.mockReturnValue(0);

        expect(estadoAlquilado.necesitaMantenimiento()).toBe(true);
        });

        it("Debe retornar TRUE si tiene 5 o mas alquileres completados", () => {
        vehiculoMock.getKmDesdeUltimoMant.mockReturnValue(0);
        vehiculoMock.getFechaUltimoMant.mockReturnValue(moment().toDate());
        vehiculoMock.getAlquileresCompletado.mockReturnValue(5);

        expect(estadoAlquilado.necesitaMantenimiento()).toBe(true);
        });

        it("Retorna FALSE si no cumple ninguna condicion", () => {
        vehiculoMock.getKmDesdeUltimoMant.mockReturnValue(5000);
        vehiculoMock.getFechaUltimoMant.mockReturnValue(moment().subtract(1, 'months').toDate());
        vehiculoMock.getAlquileresCompletado.mockReturnValue(2);

        expect(estadoAlquilado.necesitaMantenimiento()).toBe(false);
        });
    });
    
    describe("ponerDisponible()", () => {
    
        it("Transicion de Estado, Si NO necesita mantenimiento cambia a Disponible directamente", () => {
          jest.spyOn(estadoAlquilado, 'necesitaMantenimiento').mockReturnValue(false);
          estadoAlquilado.ponerDisponible();
        
          expect(vehiculoMock.cambiarEstado).toHaveBeenCalledWith(expect.any(Disponible));
          expect(vehiculoMock.cambiarEstado).not.toHaveBeenCalledWith(expect.any(Mantenimiento));
        });
    
        it("Transicion de Estado, Si SI necesita mantenimiento, resetea valores y pasa por Mantenimiento", () => {
          jest.spyOn(estadoAlquilado, 'necesitaMantenimiento').mockReturnValue(true);
        
          estadoAlquilado.ponerDisponible();

          expect(vehiculoMock.resetAlquileresCompletado).toHaveBeenCalled();
          expect(vehiculoMock.setFechaUltimoMant).toHaveBeenCalled();
          expect(vehiculoMock.setKmDesdeUltimoMant).toHaveBeenCalledWith(0);
        
          expect(vehiculoMock.cambiarEstado).toHaveBeenCalledWith(expect.any(Mantenimiento));
    
          expect(vehiculoMock.cambiarEstado).toHaveBeenCalledWith(expect.any(Disponible));
        });
    });
})