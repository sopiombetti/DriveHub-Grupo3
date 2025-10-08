import Vehiculo from "../src/vehiculos/vehiculo";

// Subclase concreta para poder instanciar Vehiculo
class VehiculoMock extends Vehiculo {
  condicionCargosExtra(kmTotales: number, diasTotales: number): boolean {
    return kmTotales > diasTotales * 100;
  }
}

describe("Clase Vehiculo (con mocks de Estado)", () => {
  let estadoMock: { getTipoEstado: jest.Mock; setTipoEstado: jest.Mock };
  let vehiculo: VehiculoMock;

  beforeEach(() => {
    // Creamos el mock manualmente
    estadoMock = {
      getTipoEstado: jest.fn().mockReturnValue("Disponible"),
      setTipoEstado: jest.fn(),
    };

    vehiculo = new VehiculoMock("ABC123", estadoMock as any, 5000);
  });

  test("debería inicializar correctamente los valores", () => {
    expect(vehiculo.getMatricula()).toBe("ABC123");
    expect(vehiculo.getKilometraje()).toBe(5000);
    expect(vehiculo.getEstado()).toBe("Disponible");
    expect(vehiculo.getTarifaBase()).toBe(0);
    expect(vehiculo.getValorCargoExtra()).toBe(0);
    expect(vehiculo.getValorCargoExtraSeguro()).toBe(0);
  });

  test("debería llamar a getTipoEstado() cuando se usa getEstado()", () => {
    vehiculo.getEstado();
    expect(estadoMock.getTipoEstado).toHaveBeenCalledTimes(1);
  });

  test("debería permitir modificar valores mediante los setters", () => {
    vehiculo.setMatricula("XYZ999");
    vehiculo.setKilometraje(10000);
    vehiculo.setTarifaBase(50);
    vehiculo.setValorCargoExtra(0.2);

    expect(vehiculo.getMatricula()).toBe("XYZ999");
    expect(vehiculo.getKilometraje()).toBe(10000);
    expect(vehiculo.getTarifaBase()).toBe(50);
    expect(vehiculo.getValorCargoExtra()).toBe(0.2);
    expect(vehiculo.getValorCargoExtraSeguro()).toBe(0);
  });

  test("debería ejecutar correctamente la lógica de condicionCargosExtra()", () => {
    expect(vehiculo.condicionCargosExtra(1200, 10)).toBe(true);
    expect(vehiculo.condicionCargosExtra(500, 10)).toBe(false);
  });
});
