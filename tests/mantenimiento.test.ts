import Mantenimiento from "../src/estados/mantenimiento";
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

})