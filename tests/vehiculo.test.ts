import Reserva from "../src/reserva";
import Vehiculo from "../src/vehiculos/vehiculo";

// Subclase concreta para poder instanciar Vehiculo
class VehiculoMock extends Vehiculo {
  condicionCargosExtra(kmTotales: number, diasTotales: number): boolean {
    return kmTotales > diasTotales * 100;
  }
}

class ReservaMock extends Reserva{}

describe("Clase Vehiculo", () => {
  let vehiculo: VehiculoMock;
  let reservaMock: ReservaMock;

  beforeEach(() => {
    vehiculo = new VehiculoMock("ABC123", 5000);
    const fechaInicio = new Date('2025-11-11T00:00:00Z');
    const fechaFin = new Date('2025-11-21T00:00:00Z');

    reservaMock = {
      getFechaInicio: jest.fn().mockReturnValue(fechaInicio),
      getFechaFin: jest.fn().mockReturnValue(fechaFin)
    } as unknown as Reserva;
  });

  it("debería inicializar correctamente los valores", () => {
    expect(vehiculo.getMatricula()).toBe("ABC123");
    expect(vehiculo.getKilometraje()).toBe(5000);
    expect(vehiculo.getTarifaBase()).toBe(0);
    expect(vehiculo.getValorCargoExtra()).toBe(0);
    expect(vehiculo.getValorCargoExtraSeguro()).toBe(0);
  });

  it("debería permitir modificar valores mediante los setters", () => {
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

  it("debería ejecutar correctamente la lógica de condicionCargosExtra()", () => {
    expect(vehiculo.condicionCargosExtra(1200, 10)).toBe(true);
    expect(vehiculo.condicionCargosExtra(500, 10)).toBe(false);
  });

  it("método puede ser alquilado debe ser false", () => {
    const fechaInicioBuscada = new Date('2025-11-11T00:00:00Z');
    const fechaFinBuscada = new Date('2025-11-13T00:00:00Z');
    vehiculo['reservasConfirmadas'] = [reservaMock];
    expect(vehiculo.puedeSerAlquilado(fechaInicioBuscada, fechaFinBuscada)).toBeFalsy();
  })

  it("método puede ser alquilado debe ser false", () => {
    const fechaInicioBuscada = new Date('2025-11-15T00:00:00Z');
    const fechaFinBuscada = new Date('2025-11-25T00:00:00Z');
    vehiculo['reservasConfirmadas'] = [reservaMock];
    expect(vehiculo.puedeSerAlquilado(fechaInicioBuscada, fechaFinBuscada)).toBe(false);
  })

  it("método puede ser alquilado debe ser true", () => {
    const fechaInicioBuscada = new Date('2025-11-24T00:00:00Z');
    const fechaFinBuscada = new Date('2025-11-30T00:00:00Z');
    vehiculo['reservasConfirmadas'] = [reservaMock];
    expect(vehiculo.puedeSerAlquilado(fechaInicioBuscada, fechaFinBuscada)).toBe(true);
  })

  it("método puede ser alquilado debe ser true", () => {
    const fechaInicioBuscada = new Date('2025-10-29T00:00:00Z');
    const fechaFinBuscada = new Date('2025-11-05T00:00:00Z');
    vehiculo['reservasConfirmadas'] = [reservaMock];
    expect(vehiculo.puedeSerAlquilado(fechaInicioBuscada, fechaFinBuscada)).toBe(true);
  })

});
