import CalculadoraTarifa from "../src/calculadoraTarifa";
import Reserva from "../src/reserva";
import Vehiculo from "../src/vehiculos/vehiculo";

type VehiculoLike = Pick<
  Vehiculo,
  | "getTarifaBase"
  | "getValorCargoExtraSeguro"
  | "getValorCargoExtra"
  | "condicionCargosExtra"
>;

type ReservaLike = Pick<
  Reserva,
  "getVehiculo" | "calcularDiasTotales" | "calcularKmTotales" | "getFechaInicio"
>;

describe("Tests de la clase calculadoraTarifa", () => {
  let vehiculoMock: jest.Mocked<VehiculoLike>;
  let reservaMock: jest.Mocked<ReservaLike>;
  let calculadora: CalculadoraTarifa;

  beforeEach(() => {
    vehiculoMock = {
      getTarifaBase: jest.fn().mockReturnValue(1000),
      getValorCargoExtraSeguro: jest.fn().mockReturnValue(200),
      getValorCargoExtra: jest.fn().mockReturnValue(5),
      condicionCargosExtra: jest.fn().mockReturnValue(false),
    };

    const fecha = new Date('2025-02-18T00:00:00Z');

    reservaMock = {
      getVehiculo: jest.fn().mockReturnValue(vehiculoMock),
      calcularDiasTotales: jest.fn().mockReturnValue(3),
      calcularKmTotales: jest.fn().mockReturnValue(250),
      getFechaInicio: jest.fn().mockReturnValue(fecha)
    };

    calculadora = new CalculadoraTarifa();

  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("Test método calcularTemporada - Media", () => {
    const fecha = new Date('2025-10-18T00:00:00Z');
    const total = calculadora.calcularTemporada(fecha);
    const resultadoEsperado = 1;
    expect(total).toBe(resultadoEsperado);
  });

  it("Test método calcularTemporada - Baja", () => {
    const fecha = new Date('2025-06-18T00:00:00Z');
    const total = calculadora.calcularTemporada(fecha);
    const resultadoEsperado = 0.9;
    expect(total).toBe(resultadoEsperado);
  });

  it("Test método calcularTemporada - Alta", () => {
    const fecha = new Date('2025-02-18T00:00:00Z');
    const total = calculadora.calcularTemporada(fecha);
    const resultadoEsperado = 1.2;
    expect(total).toBe(resultadoEsperado);
  });

  it("Debe calcular sin cargos extra cuando condicionCargosExtra() es false", () => {
    vehiculoMock.condicionCargosExtra.mockReturnValue(false);

    const total = calculadora.calcularTarifa(
      reservaMock as unknown as Reserva
    );

    const resultadoEsperado = ((1000 * 1.2) + 200) * 3;
    expect(total).toBe(resultadoEsperado);
    expect(vehiculoMock.condicionCargosExtra).toHaveBeenCalledWith(250, 3);
    expect(reservaMock.getVehiculo).toHaveBeenCalled();
    expect(reservaMock.calcularDiasTotales).toHaveBeenCalled();
    expect(reservaMock.calcularKmTotales).toHaveBeenCalled();
  });

  it("Debe sumar cargos extra cuando condicionCargosExtra() es true", () => {
    vehiculoMock.condicionCargosExtra.mockReturnValue(true);

    const total = calculadora.calcularTarifa(
      reservaMock as unknown as Reserva
    );

    const resultadoEsperado = ((1000 * 1.2) + 200) * 3 + 5 * 250;
    expect(total).toBe(resultadoEsperado);
    expect(vehiculoMock.condicionCargosExtra).toHaveBeenCalledWith(250, 3);
    expect(reservaMock.getVehiculo).toHaveBeenCalled();
    expect(reservaMock.calcularDiasTotales).toHaveBeenCalled();
    expect(reservaMock.calcularKmTotales).toHaveBeenCalled();
  });

  it("Test adicional para prueba de datos de Mock", () => {
    vehiculoMock.getTarifaBase.mockReturnValue(800);
    vehiculoMock.getValorCargoExtraSeguro.mockReturnValue(100);
    vehiculoMock.getValorCargoExtra.mockReturnValue(10);
    reservaMock.calcularDiasTotales.mockReturnValue(2);
    reservaMock.calcularKmTotales.mockReturnValue(50);
    vehiculoMock.condicionCargosExtra.mockReturnValue(true);

    const total = calculadora.calcularTarifa(
      reservaMock as unknown as Reserva
    );
    expect(total).toBe(((800 * 1.2) + 100) * 2 + 10 * 50);
    expect(vehiculoMock.condicionCargosExtra).toHaveBeenCalledWith(50, 2);
    expect(reservaMock.getVehiculo).toHaveBeenCalled();
    expect(reservaMock.calcularDiasTotales).toHaveBeenCalled();
    expect(reservaMock.calcularKmTotales).toHaveBeenCalled();
  });
});
