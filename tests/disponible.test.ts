import Disponible from "../src/estados/disponible"
import Vehiculo from "../src/vehiculos/vehiculo";

describe("Clase Disponible", () => {
  class MockVehiculo extends Vehiculo {
          constructor() {
              super('ABC123', 10000); 
          }
  
          public condicionCargosExtra(kmTotales: number, diasTotales: number): boolean {
              return false; 
          }
      }
  
      let disponible: Disponible;
      let vehiculo: MockVehiculo;
      
      beforeEach(() => {
        vehiculo = new MockVehiculo();
        disponible = new Disponible(vehiculo);
      });

  test("debería crearse correctamente", () => {
    expect(disponible).toBeInstanceOf(Disponible);
  });

});
