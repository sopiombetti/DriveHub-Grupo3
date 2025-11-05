import Limpieza from "../src/estados/limpieza";
import Vehiculo from "../src/vehiculos/vehiculo";

describe("Tests de la clase Limpieza", () => {

  class MockVehiculo extends Vehiculo {
      constructor() {
          super('ABC123', 10000); 
      }
  
      public condicionCargosExtra(kmTotales: number, diasTotales: number): boolean {
          return false; 
      }
  }

  let instance: Limpieza;
  let vehiculo: MockVehiculo;

  beforeEach(() => {
    vehiculo = new MockVehiculo();
    instance = new Limpieza(vehiculo);
  });

  it("Debe ser una instancia de la clase Limpieza", () => {
    expect(instance).toBeInstanceOf(Limpieza);
  });

});
