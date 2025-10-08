import Disponible from "../src/estados/disponible"

describe("Clase Disponible", () => {
  let disponible: Disponible;

  beforeEach(() => {
    disponible = new Disponible();
  });

  test("debería crearse correctamente", () => {
    expect(disponible).toBeInstanceOf(Disponible);
  });

  test('debería tener el tipo de estado "Disponible"', () => {
    expect(disponible.getTipoEstado()).toBe("Disponible");
  });

  test("debería permitir cambiar el tipo de estado mediante setTipoEstado", () => {
    disponible.setTipoEstado("Mantenimiento");
    expect(disponible.getTipoEstado()).toBe("Mantenimiento");
  });
});
