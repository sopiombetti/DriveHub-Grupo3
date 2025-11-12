import Vehiculo from "../src/vehiculos/vehiculo";

// Subclase concreta para poder instanciar Vehiculo
class VehiculoMock extends Vehiculo {
  condicionCargosExtra(kmTotales: number, diasTotales: number): boolean {
    return kmTotales > diasTotales * 100;
  }
}

describe("Clase Vehiculo", () => {
  let vehiculo: VehiculoMock;

  beforeEach(() => {
    vehiculo = new VehiculoMock("ABC123", 5000);
  });

  test("debería inicializar correctamente los valores", () => {
    expect(vehiculo.getMatricula()).toBe("ABC123");
    expect(vehiculo.getKilometraje()).toBe(5000);
    expect(vehiculo.getTarifaBase()).toBe(0);
    expect(vehiculo.getValorCargoExtra()).toBe(0);
    expect(vehiculo.getValorCargoExtraSeguro()).toBe(0);
  });

  test("debería permitir modificar valores mediante los setters", () => {
    vehiculo.setMatricula("XYZ999");
    vehiculo.setTarifaBase(50);
    vehiculo.setValorCargoExtra(0.2);
    vehiculo.actualizarKilometraje(100);

    expect(vehiculo.getMatricula()).toBe("XYZ999");
    expect(vehiculo.getKilometraje()).toBe(5100);
    expect(vehiculo.getTarifaBase()).toBe(50);
    expect(vehiculo.getValorCargoExtra()).toBe(0.2);
    expect(vehiculo.getValorCargoExtraSeguro()).toBe(0);
  });

  test("debería ejecutar correctamente la lógica de condicionCargosExtra()", () => {
    expect(vehiculo.condicionCargosExtra(1200, 10)).toBe(true);
    expect(vehiculo.condicionCargosExtra(500, 10)).toBe(false);
  });
});
