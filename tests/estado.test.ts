import Estado from "../src/estados/estado";

//subclase concreta para testear Estado
class EstadoMock extends Estado {
  constructor(tipoEstado: string) {
    super(tipoEstado);
  }
}

describe("Tests de la clase Estado", () => {
  let instance: EstadoMock;

  beforeEach(() => {
    instance = new EstadoMock("Disponible");
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("Debe ser una instancia de la clase Estado", () => {
    expect(instance).toBeInstanceOf(Estado);
  });

  it('Debe tener el tipo de estado "Disponible"', () => {
    expect(instance.getTipoEstado()).toBe("Disponible");
  });

  it("Debe poder setearse el tipo de estado", () => {
    instance.setTipoEstado("Mantenimiento");
    expect(instance.getTipoEstado()).toBe("Mantenimiento");
  });
});
