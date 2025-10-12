import Estado from "../src/estados/estado";
import Compacto from "../src/vehiculos/compacto";

describe("Tests de la clase Compacto", () => {
  let instance: Compacto;

  type EstadoLike = Pick<Estado, "getTipoEstado" | "setTipoEstado">;

  let estadoMock: jest.Mocked<EstadoLike>;
  beforeEach(() => {
    estadoMock = {
      getTipoEstado: jest.fn().mockReturnValue("Disponible"),
      setTipoEstado: jest.fn(),
    };
    instance = new Compacto("AB001CD", estadoMock as unknown as Estado, 10000);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it("Debe ser una instancia de la clase Compacto", () => {
    expect(instance).toBeInstanceOf(Compacto);
  });

  it("Debe de inicializarse con los valores pasados por parametro", () => {
    expect(instance.getMatricula()).toBe("AB001CD");
    expect(instance.getKilometraje()).toBe(10000);
    expect(instance.getEstado()).toBe("Disponible");
  });

  it("Debe retornar true si el promedio de km por dia es mayor a 100", () => {
    const kilometrosTotales = 1200;
    const diasTotales = 10;

    const resultado = instance.condicionCargosExtra(
      kilometrosTotales,
      diasTotales
    );
    expect(resultado).toBe(true);
  });

  it("Debe retornar false si el promedio de km por dia es igual a 100", () => {
    const kilometrosTotales = 1000;
    const diasTotales = 10;

    const resultado = instance.condicionCargosExtra(
      kilometrosTotales,
      diasTotales
    );
    expect(resultado).toBe(false);
  });

  it("Debe retornar false si el promedio de km por dia es menor a 100", () => {
    const kilometrosTotales = 800;
    const diasTotales = 10;

    const resultado = instance.condicionCargosExtra(
      kilometrosTotales,
      diasTotales
    );
    expect(resultado).toBe(false);
  });
  /*
    CASO DIAS 0 O NEGATIVOS 
    Si normalizamos el 0 a 1, tomando que siempre se interpreta un minimo de 1 dia de alquiler
    
    it('debe retornar false si los dias totales son cero', () => {
        const kilometrosTotales = 200;
        const diasTotales = 0;

        const resultado = instance.condicionCargosExtra(kilometrosTotales, diasTotales);

        expect(resultado).toBe(false);
    })
      
      Sino,con lanzamiento de una excepcion
      
      it('debe lanzar una excepción si los días totales son cero o menos', () => {
        const kmTotales = 200;
        const diasTotales = 0;
        expect(() => {
            calculadora.condicionCargosExtra(kmTotales, diasTotales);
        }).toThrow("El número de días totales no puede ser cero o negativo.");
    });
  */
});
