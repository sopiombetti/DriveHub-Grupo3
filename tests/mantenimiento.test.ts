import Mantenimiento from "../src/estados/mantenimiento";
import { AlquilarException } from "../src/excepciones/alquilarException";
import { MantenimientoException } from "../src/excepciones/mantenimientoException";
import Vehiculo from "../src/vehiculos/vehiculo";

describe('Test Clase Mantenimiento',()=>{

    class MockVehiculo extends Vehiculo {
        constructor() {
            super('ABC123', 10000); 
        }

        public condicionCargosExtra(kmTotales: number, diasTotales: number): boolean {
            return false; 
        }
    }

    let mantenimiento: Mantenimiento;
    let vehiculo: MockVehiculo;
    
    beforeEach(() => {
      vehiculo = new MockVehiculo();
      mantenimiento = new Mantenimiento(vehiculo);
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

})