import moment from "moment";
import Reserva from "../src/reserva";
import Vehiculo from "../src/vehiculos/vehiculo";
import IEstado from "../src/estados/estado";
import Disponible from "../src/estados/disponible";

// Subclase concreta para poder instanciar Vehiculo
class VehiculoMock extends Vehiculo {
  condicionCargosExtra(kmTotales: number, diasTotales: number): boolean {
    return kmTotales > diasTotales * 100;
  }
}

class ReservaMock extends Reserva{}

describe("Clase Vehiculo", () => {
  let vehiculo: VehiculoMock;
  let reservaMock : ReservaMock;
  let reservaMockFutura: ReservaMock;
  let reservaMockPasada : ReservaMock;
  let estadoMock: IEstado;

  beforeEach(() => {
    vehiculo = new VehiculoMock("ABC123", 5000);
    const fechaInicio = new Date('2025-11-11T00:00:00Z');
    const fechaFin = new Date('2025-11-21T00:00:00Z');

    reservaMock = {
      getFechaInicio: jest.fn().mockReturnValue(fechaInicio),
      getFechaFin: jest.fn().mockReturnValue(fechaFin)
    } as unknown as Reserva;

    reservaMockFutura = {
      getFechaInicio: jest.fn().mockReturnValue('2026-11-11T00:00:00Z'),
      getFechaFin: jest.fn().mockReturnValue('2026-11-15T00:00:00Z')
    } as unknown as Reserva;

    reservaMockPasada = {
      getFechaInicio: jest.fn().mockReturnValue('2023-11-11T00:00:00Z'),
      getFechaFin: jest.fn().mockReturnValue('2023-11-15T00:00:00Z')
    } as unknown as Reserva;

      estadoMock = {
      alquilar: jest.fn(),
      ponerEnMantenimiento: jest.fn(),
      ponerDisponible: jest.fn()
    } as jest.Mocked<IEstado>;

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
  });

  it("método puede ser alquilado debe ser false", () => {
    const fechaInicioBuscada = new Date('2025-11-15T00:00:00Z');
    const fechaFinBuscada = new Date('2025-11-25T00:00:00Z');
    vehiculo['reservasConfirmadas'] = [reservaMock];
    expect(vehiculo.puedeSerAlquilado(fechaInicioBuscada, fechaFinBuscada)).toBe(false);
  });

  it("método puede ser alquilado debe ser true", () => {
    const fechaInicioBuscada = new Date('2025-11-24T00:00:00Z');
    const fechaFinBuscada = new Date('2025-11-30T00:00:00Z');
    vehiculo['reservasConfirmadas'] = [reservaMock];
    expect(vehiculo.puedeSerAlquilado(fechaInicioBuscada, fechaFinBuscada)).toBe(true);
  });

  it("método puede ser alquilado debe ser true", () => {
    const fechaInicioBuscada = new Date('2025-10-29T00:00:00Z');
    const fechaFinBuscada = new Date('2025-11-05T00:00:00Z');
    vehiculo['reservasConfirmadas'] = [reservaMock];
    expect(vehiculo.puedeSerAlquilado(fechaInicioBuscada, fechaFinBuscada)).toBe(true);
  });

  it('debe inicializar con cero mantenimientos', () => {
    expect(vehiculo.getCantMantenimiento()).toBe(0);
  });

  it('debe incrementar en uno la cantidad de mantenimientos', ()=>{
    vehiculo.sumarCantMantenimiento();
    vehiculo.sumarCantMantenimiento();

    expect(vehiculo.getCantMantenimiento()).toBe(2);
  });

  it('debe retornar la cantidad de mantenimientos que tuvo el vehiculo', ()=>{
    vehiculo.sumarCantMantenimiento();
    vehiculo.sumarCantMantenimiento();
    vehiculo.sumarCantMantenimiento();
    vehiculo.sumarCantMantenimiento();

    expect(vehiculo.getCantMantenimiento()).toBe(4);
  });

  it('debe incrementar en uno la cantidad de alquileres cumplidos', ()=>{
    vehiculo.sumarAlquiler();
    vehiculo.sumarAlquiler();

    expect(vehiculo.getAlquileresCompletado()).toBe(2);
  });

  it('debe setear en 0 la cantidad de alquileres cumplidos', ()=>{

    vehiculo['alquileresCompletados']=4;

    vehiculo.resetAlquileresCompletado();

    expect(vehiculo.getAlquileresCompletado()).toBe(0);
  });

  it('debe setear los kilometros desde el ultimo mantenimiento' ,()=>{

    vehiculo.setKmDesdeUltimoMant(2203);

    expect(vehiculo.getKmDesdeUltimoMant()).toBe(2203);
    expect(vehiculo.getKmDesdeUltimoMant()).not.toBeNull();
  });

  it('debe obtener los kilometros desde el ultimo mantenimiento' ,()=>{
      vehiculo['kmDesdeUltimoMant'] = 2230;

      expect(vehiculo.getKmDesdeUltimoMant()).toBe(2230);
  });

  it('debe poder actualizar los kilometros desde el ultimo mantenimiento', ()=>{

    const kilometrajeAnterior = vehiculo.getKmDesdeUltimoMant();
    vehiculo.actualizarKmDesdeUltMant(2002);
    const kilometrajePosterior = vehiculo.getKmDesdeUltimoMant();

    expect(kilometrajePosterior).toBe(kilometrajeAnterior+2002)
  })

  it('debe inicializar la fecha en la que se realizo el ultimo mantenimiento como este momento', ()=>{

    const fechaMockeada = new Date('2025-11-23T10:00:00');

    jest.useFakeTimers();
    jest.setSystemTime(fechaMockeada);

    const vehiculoNuevo = new VehiculoMock('123', 10000);

    const fechaMantenimiento = vehiculoNuevo.getFechaUltimoMant();
    expect(fechaMantenimiento).toEqual(fechaMockeada);
    expect(fechaMantenimiento).toBeInstanceOf(Date);

    jest.useRealTimers();

  });

  it('debe poder setearse la fecha en la que se realizo el ultimo mantenimiento', ()=>{
    const fecha = new Date('2025-11-02T10:00:00');
    const fechaDos = new Date('2022-11-02T10:00:00'); 

    vehiculo['fechaUltimoMant'] = fecha;

    vehiculo.setFechaUltimoMant(fechaDos);

    const fechaMantenimiento = vehiculo.getFechaUltimoMant();

    expect(fechaMantenimiento).toBeInstanceOf(Date);
    expect(fechaMantenimiento).toEqual(fechaDos);
    expect(fechaMantenimiento).not.toBe(fecha);

  });

  it('debe devolver la fecha en la que se realizo el ultimo mantenimiento', ()=>{
    const fecha = new Date('2025-11-02T10:00:00')
    vehiculo['fechaUltimoMant'] =fecha ;

    const fechaMantenimiento = vehiculo.getFechaUltimoMant();

    expect(fechaMantenimiento).toBeInstanceOf(Date);
    expect(fechaMantenimiento).toEqual(fecha);

  });
  
  it('debe actualizar el kilometaje',() => {
    const kilometros = vehiculo.getKilometraje();

    vehiculo.actualizarKilometraje(2230);

    const nuevoKilometraje = vehiculo.getKilometraje();

    expect(nuevoKilometraje).toBe(kilometros+2230);
  });

  describe('Reservas', ()=>{
    it('debe retornar una lista de reservas que confirmadas' , ()=>{
        vehiculo['reservasConfirmadas'] = [reservaMock,reservaMockPasada,reservaMockFutura];
        const reservas = vehiculo.getReservasConfirmadas();
        expect(reservas).toHaveLength(3);
    });

    it('debe agregar una reserva a la lista de reservas confirmadas', () => {
      vehiculo['reservasConfirmadas'] = [reservaMockFutura,reservaMockPasada]
      vehiculo.agregarReserva(reservaMock); 
      const reservas = vehiculo.getReservasConfirmadas();
      
      expect(reservas).toHaveLength(3);
      expect(reservas).toContain(reservaMock);
    });

    it('debe devolver una lista vacía cuando no hay reservas', () => {
      const reservas = vehiculo.getReservasConfirmadas();
      expect(reservas).toEqual([]);
      expect(reservas).toHaveLength(0);
    });
  });

  describe('Estados', ()=>{

    it('debe incializar el vehiculo con el estado Disponible' , () => {
      const estadoVehiculo = vehiculo.getEstado();

      expect(estadoVehiculo).toBeInstanceOf(Disponible);

    })

    it('debe poder obtenerse el estado del vehiculo' , () => {
      vehiculo['estado'] = estadoMock;

      const estadoVehiculo = vehiculo.getEstado();

      expect(estadoVehiculo).toBe(estadoMock);

    })

    it('debe cambiar el estado del vehículo', () => {
      vehiculo.cambiarEstado(estadoMock);

      expect(vehiculo.getEstado()).toBe(estadoMock);
    });

    it('alquilar(), debe llamarse mediante el estado actual', () => {
      vehiculo.cambiarEstado(estadoMock);
      
      vehiculo.alquilar();

      expect(estadoMock.alquilar).toHaveBeenCalledTimes(1);
    });



    it('ponerEnMantemiento(), debe llamarse mediante el la acción al estado actual', () => {
      vehiculo.cambiarEstado(estadoMock);
      
      vehiculo.ponerEnMantenimiento();

      expect(estadoMock.ponerEnMantenimiento).toHaveBeenCalledTimes(1);
    });

    it('ponerDisponible(), debe llamarse mediante el acción al estado actual', () => {
      vehiculo.cambiarEstado(estadoMock);
      
      vehiculo.ponerDisponible();

      expect(estadoMock.ponerDisponible).toHaveBeenCalledTimes(1);
    });


   });
});
