import Disponible from "../src/estados/disponible";
import Mantenimiento from "../src/estados/mantenimiento";
import { AlquilarException } from "../src/excepciones/alquilarException";
import { MantenimientoException } from "../src/excepciones/mantenimientoException";
import Vehiculo from "../src/vehiculos/vehiculo";

describe('Test Clase Mantenimiento',()=>{

    let mantenimiento: Mantenimiento;
    let vehiculoMock: jest.Mocked<Vehiculo>;
    
    beforeEach(() => {
      vehiculoMock = {
        cambiarEstado: jest.fn()
      } as unknown as jest.Mocked<Vehiculo>;
      mantenimiento = new Mantenimiento(vehiculoMock);
    });

    it('debe ser una instancia de Mantenimiento',()=>{
      expect(mantenimiento).toBeInstanceOf(Mantenimiento);
    })

    it('debe lanzar excepcion alquilar', () => {
      expect(() => mantenimiento.alquilar()).toThrow(AlquilarException);
      expect(() => mantenimiento.alquilar()).toThrow("El vehiculo no se puede alquilar");
    })

    it('debe lanzar excepcion mantenimiento', () => {
      expect(() => mantenimiento.ponerEnMantenimiento()).toThrow(MantenimientoException);
      expect(() => mantenimiento.ponerEnMantenimiento()).toThrow("El vehiculo no puede ser enviado a mantenimiento");
    })

    it('debe cambiar de estado a disponible', () => {
      mantenimiento.ponerDisponible();
      expect(vehiculoMock.cambiarEstado).toHaveBeenCalledWith(expect.any(Disponible));
    })

})