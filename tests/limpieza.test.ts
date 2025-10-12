import Limpieza from "../src/estados/limpieza";

describe("Tests de la clase Limpieza", () => {
  let instance: Limpieza;

  beforeEach(() => {
    instance = new Limpieza();
  });

  it("Debe ser una instancia de la clase Limpieza", () => {
    expect(instance).toBeInstanceOf(Limpieza);
  });

  it('Debe tener el tipo de estado "Limpieza"', () => {
    expect(instance.getTipoEstado()).toBe("Limpieza");
  });

  it("Debe poder setearse el tipo de estado", () => {
    instance.setTipoEstado("Disponible");
    expect(instance.getTipoEstado()).toBe("Disponible");
  });

});
