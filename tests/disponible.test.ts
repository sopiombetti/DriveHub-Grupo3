import {Alquilado} from "../src/estados/alquilado";
import {Disponible} from "../src/estados/disponible"
import {Mantenimiento} from "../src/estados/mantenimiento";
import {Vehiculo} from "../src/vehiculos/vehiculo";

describe("Clase Disponible", () => {
  
  let vehiculoMock: jest.Mocked<Vehiculo>;
  let disponible: Disponible;
      
  beforeEach(() => {
    vehiculoMock = {
      cambiarEstado: jest.fn(),
      sumarAlquiler: jest.fn()
    } as unknown as jest.Mocked<Vehiculo>;

    disponible = new Disponible(vehiculoMock);
  });

  it("debería crearse correctamente", () => {
    expect(disponible).toBeInstanceOf(Disponible);
  });

  it("cambiar estado a alqulado", () => {
    disponible.alquilar();
    expect(vehiculoMock.cambiarEstado).toHaveBeenCalledWith(expect.any(Alquilado));
    expect(vehiculoMock.sumarAlquiler).toHaveBeenCalled();
  })

  it("cambiar de estado a mantenimiento", () => {
    disponible.ponerEnMantenimiento();
    expect(vehiculoMock.cambiarEstado).toHaveBeenCalledWith(expect.any(Mantenimiento));
  })

  it("deberia lanzar un error al querer poner disponible", () => {
    expect(() => disponible.ponerDisponible()).toThrow("El vehiculo ya se encuentra disponible");
  })

});
