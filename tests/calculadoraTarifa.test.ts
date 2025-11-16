import {CalculadoraTarifa} from "../src/calculadoraTarifa";
import {Reserva} from "../src/reserva";
import {Temporada} from "../src/temporadas/temporada";
import {Vehiculo} from "../src/vehiculos/vehiculo";
import moment from "moment";

type VehiculoLike = Pick<
  Vehiculo,
  | "getTarifaBase"
  | "getValorCargoExtraSeguro"
  | "getValorCargoExtra"
  | "condicionCargosExtra"
>;

type ReservaLike = Pick<
  Reserva,
  "getVehiculo" | "calcularDiasTotales" | "calcularKmRecorridos" | "getFechaInicio" | "getTemporada" | "setTemporada"
>;

type TemporadaLike = Pick<
  Temporada,
  "getPorcentajeTarifa"
>;

describe("Tests de la clase calculadoraTarifa", () => {
  let vehiculoMock: jest.Mocked<VehiculoLike>;
  let reservaMock: jest.Mocked<ReservaLike>;
  let calculadora: CalculadoraTarifa;
  let temporadaAltaMock: jest.Mocked<TemporadaLike>;
  let temporadaMediaMock: jest.Mocked<TemporadaLike>;
  let temporadaBajaMock: jest.Mocked<TemporadaLike>;

  beforeEach(() => {
    vehiculoMock = {
      getTarifaBase: jest.fn().mockReturnValue(1000),
      getValorCargoExtraSeguro: jest.fn().mockReturnValue(200),
      getValorCargoExtra: jest.fn().mockReturnValue(5),
      condicionCargosExtra: jest.fn().mockReturnValue(false),
    };

    const fecha = new Date('2025-02-18T00:00:00Z');

    temporadaAltaMock = {
      getPorcentajeTarifa: jest.fn().mockReturnValue(1.2)
    }

    temporadaMediaMock = {
      getPorcentajeTarifa: jest.fn().mockReturnValue(1)
    }

    temporadaBajaMock = {
      getPorcentajeTarifa: jest.fn().mockReturnValue(0.9)
    }

    reservaMock = {
      getVehiculo: jest.fn().mockReturnValue(vehiculoMock),
      calcularDiasTotales: jest.fn().mockReturnValue(3),
      calcularKmRecorridos: jest.fn().mockReturnValue(250),
      getFechaInicio: jest.fn().mockReturnValue(fecha),
      getTemporada: jest.fn().mockReturnValue(temporadaAltaMock),
      setTemporada: jest.fn()
    };

    calculadora = new CalculadoraTarifa();

  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
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
    expect(reservaMock.calcularKmRecorridos).toHaveBeenCalled();
    expect(reservaMock.getTemporada().getPorcentajeTarifa()).toBe(1.2);
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
    expect(reservaMock.calcularKmRecorridos).toHaveBeenCalled();
    expect(reservaMock.getTemporada().getPorcentajeTarifa()).toBe(1.2);
  });

  it("Test adicional para prueba de datos de Mock", () => {
    vehiculoMock.getTarifaBase.mockReturnValue(800);
    vehiculoMock.getValorCargoExtraSeguro.mockReturnValue(100);
    vehiculoMock.getValorCargoExtra.mockReturnValue(10);
    reservaMock.calcularDiasTotales.mockReturnValue(2);
    reservaMock.calcularKmRecorridos.mockReturnValue(50);
    vehiculoMock.condicionCargosExtra.mockReturnValue(true);

    const total = calculadora.calcularTarifa(
      reservaMock as unknown as Reserva
    );
    expect(total).toBe(((800 * 1.2) + 100) * 2 + 10 * 50);
    expect(vehiculoMock.condicionCargosExtra).toHaveBeenCalledWith(50, 2);
    expect(reservaMock.getVehiculo).toHaveBeenCalled();
    expect(reservaMock.calcularDiasTotales).toHaveBeenCalled();
    expect(reservaMock.calcularKmRecorridos).toHaveBeenCalled();
  });
});
