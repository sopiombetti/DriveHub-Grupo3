import Admin from '../src/admin';
import Cliente from '../src/cliente';
import Vehiculo from '../src/vehiculos/vehiculo';
import SolicitudReserva from '../src/solicitudReserva';
import Reserva from '../src/reserva';


class MockVehiculo extends Vehiculo{
    constructor(matricula:string, kilometraje:number) {
        super(matricula, kilometraje);
    }
    condicionCargosExtra(kmTotales: number, diasTotales: number): boolean {
        return true;
    }
}
class ReservaMock extends Reserva{

}
class MockCliente extends Cliente{
}

describe('Tests clase Admin', () => {
    let admin: Admin;
    let reservaMock: Reserva;
    let reservaMockDos:Reserva;
    let reservaMockTres: Reserva;
    let mockVehiculo1: MockVehiculo;
    let mockVehiculo2: MockVehiculo;
    let mockVehiculo3: MockVehiculo;
    let reservaMockCuatro : Reserva;
    beforeEach(() => {
        admin = new Admin();
        
        mockVehiculo1 = new MockVehiculo('AUTO-UNO', 10);
        mockVehiculo2 = new MockVehiculo('AUTO-DOS', 20);
        mockVehiculo3 = new MockVehiculo('AUTO-TRES', 30);

        reservaMock ={ 
            getFechaInicio: jest.fn().mockReturnValue('2025-10-20T00:00:00Z'),
            getFechaFin: jest.fn().mockReturnValue('2025-10-25T00:00:00Z'),
            getVehiculo: jest.fn().mockReturnValue(mockVehiculo1),
            calcularTarifaReserva: jest.fn().mockReturnValue(100)
        }as unknown as Reserva;

        reservaMockDos = { 
            getFechaInicio: jest.fn().mockReturnValue('2025-10-07T00:00:00Z'),
            getFechaFin: jest.fn().mockReturnValue('2025-10-28T00:00:00Z'),
            getVehiculo: jest.fn().mockReturnValue(mockVehiculo2),
            calcularTarifaReserva: jest.fn().mockReturnValue(200)

        }as unknown as Reserva;

        reservaMockTres = {    
            getFechaInicio: jest.fn().mockReturnValue('2025-10-08T00:00:00Z'),
            getFechaFin: jest.fn().mockReturnValue('2025-10-18T00:00:00Z'),
            getVehiculo: jest.fn().mockReturnValue(mockVehiculo3),
              calcularTarifaReserva: jest.fn().mockReturnValue(300)

        }as unknown as Reserva;

        reservaMockCuatro = {
            getFechaInicio: jest.fn().mockReturnValue('2025-10-30T00:00:00Z'),
            getFechaFin: jest.fn().mockReturnValue('2025-11-02T00:00:00Z'),
            getVehiculo: jest.fn().mockReturnValue(mockVehiculo1),
            calcularTarifaReserva: jest.fn().mockReturnValue(400)
        } as unknown as Reserva;

    });

    describe('obtenerAlquileresEnRango', () => {
        it('debe devolver solo las reservas que se solapan con el rango de fechas', () => {
            const fechaInicio = new Date('2025-10-10T00:00:00Z');
            const fechaFin = new Date('2025-10-20T00:00:00Z');
            admin['reservas'] = [reservaMock, reservaMockDos,reservaMockTres];
            const resultado = (admin as any).obtenerAlquileresEnRango(fechaInicio, fechaFin);

            expect(resultado.length).toBe(3);
            expect(resultado).toContain(reservaMock);
            expect(resultado).toContain(reservaMockDos);
            expect(resultado).toContain(reservaMockTres);
        });

        it('debe devolver solo la reserva que esta dentro del rango de fechas', () => {
            const fechaInicio = new Date('2025-10-01T00:00:00Z');
            const fechaFin = new Date('2025-10-19T00:00:00Z');
            admin['reservas'] = [reservaMock, reservaMockDos,reservaMockTres];
            const resultado = (admin as any).obtenerAlquileresEnRango(fechaInicio, fechaFin);

            expect(resultado.length).toBe(2);
            expect(resultado).not.toContain(reservaMock);
            expect(resultado).toContain(reservaMockDos);
            expect(resultado).toContain(reservaMockTres);
        });

        it('debe devolver un array vacio si ninguna reserva coincide con las fechas', () => {
            const fechaInicio = new Date('2025-12-01T00:00:00Z');
            const fechaFin = new Date('2025-12-10T00:00:00Z');
            admin['reservas'] = [reservaMock, reservaMockDos,reservaMockTres];

            const resultado = (admin as any).obtenerAlquileresEnRango(fechaInicio, fechaFin);

            expect(resultado.length).toBe(0);
            expect(resultado).not.toContain(reservaMock);
            expect(resultado).not.toContain(reservaMockDos);
            expect(resultado).not.toContain(reservaMockTres);
        });
        
        it('debe devolver un array vacío si la lista de reservas esta vacia', () => {
            admin['reservas'] = [];
            const fechaInicio = new Date('2025-10-10T00:00:00Z');
            const fechaFin = new Date('2025-10-20T00:00:00Z');

            const resultado = (admin as any).obtenerAlquileresEnRango(fechaInicio, fechaFin);
            
            expect(resultado.length).toBe(0);
            expect(resultado).toEqual([]);
        });

    });
    
    describe('contarAlquileresPorVehiculo', () => {

        it('debe contar correctamente la cantidad de alquileres para cada vehículo ', () => {
            const alquileres = [reservaMock, reservaMockDos, reservaMockTres];
            const resultado = (admin as any).contarAlquileresPorVehiculo(alquileres);
            expect(resultado.size).toBe(3);
            expect(resultado.get(mockVehiculo1)).toBe(1);
            expect(resultado.get(mockVehiculo2)).toBe(1);
            expect(resultado.get(mockVehiculo3)).toBe(1);
        });

        it('debe contar correctamente si un vehiculo se repite', () => {
            const alquileres = [reservaMock, reservaMockDos, reservaMock,reservaMock];
            
            const resultado = (admin as any).contarAlquileresPorVehiculo(alquileres);

            expect(resultado.size).toBe(2);
            expect(resultado.get(mockVehiculo1)).toBe(3);
            expect(resultado.get(mockVehiculo2)).toBe(1);
        });

        it('debe devolver un mapa vacio si la lista de alquileres esta vacia', () => {
            const alquileres: Reserva[] = [];
            const resultado = (admin as any).contarAlquileresPorVehiculo(alquileres);
            
            expect(resultado.size).toBe(0);
        });
    });

    describe('obtenerAutoMasAlquilado', () => {
        it('debe devolver el vehiculo mas veces alquilado', () => {
            const autosAlquilados = new Map<Vehiculo, number>([
                [mockVehiculo1, 2],
                [mockVehiculo2, 8],
                [mockVehiculo3, 1]
            ]);
            const resultado = (admin as any).obtenerAutoMasAlquilado(autosAlquilados);
            expect(resultado).toBe(mockVehiculo2);
        });

        it('debe devolver el primer vehiculo en caso de que exista otro con la misma cantidad', () => {
             const conteo = new Map<Vehiculo, number>([
                [mockVehiculo1, 5],
                [mockVehiculo2, 5],
                [mockVehiculo3, 1]
            ]);
            const resultado = (admin as any).obtenerAutoMasAlquilado(conteo);
            expect(resultado).toBe(mockVehiculo1);
        });
        
        it('debe devolver undefined si el mapa esta vacio', () => {
            const conteo = new Map<Vehiculo, number>();
            const resultado = (admin as any).obtenerAutoMasAlquilado(conteo);
            expect(resultado).toBeUndefined();
        });
    });

    describe('obtenerCostosMantenimiento', () => {
        it('debe calcular los costos de mantenimiento de cada vehiculo',()=>{
        admin['vehiculos'] = [mockVehiculo1, mockVehiculo2, mockVehiculo3];

        jest.spyOn(Math, 'random').mockReturnValue(0.5);

        jest.spyOn(mockVehiculo1, 'getCantMantenimiento').mockReturnValue(1);
        jest.spyOn(mockVehiculo2, 'getCantMantenimiento').mockReturnValue(2);
        jest.spyOn(mockVehiculo3, 'getCantMantenimiento').mockReturnValue(5);

        const resultado = admin.obtenerCostosMantenimiento();

        expect(resultado.has(mockVehiculo1)).toBe(true);
        expect(resultado.has(mockVehiculo2)).toBe(true);
        expect(resultado.has(mockVehiculo3)).toBe(true);
        expect(resultado.size).toBe(3);
        expect(resultado.get(mockVehiculo1)).toBe(1 * 100);
        expect(resultado.get(mockVehiculo2)).toBe(2 * 100);
        expect(resultado.get(mockVehiculo3)).toBe(5 * 100);
    
        })

    })
    describe('obtenerGananciasAlquileres',() =>{
        it('debe sumar las ganancias de los alquileres completados por cada vehiculo', () => {
 
        admin['reservas'] = [reservaMock,reservaMockDos,reservaMockTres,reservaMockCuatro];

        const resultado = admin.obtenerGananciasAlquileres();
        
        expect(resultado.has(mockVehiculo1)).toBe(true);
        expect(resultado.has(mockVehiculo2)).toBe(true);
        expect(resultado.has(mockVehiculo3)).toBe(true);
        expect(resultado.size).toBe(3);
        expect(resultado.get(mockVehiculo1)).toBe(100+400);
        expect(resultado.get(mockVehiculo2)).toBe(200);
        expect(resultado.get(mockVehiculo3)).toBe(300);
    });
    })

    describe('obtenerRentabilidad',() =>{
        it('debe devolver un string con el vehiculo mas y menos rentable', () =>{
            const costos = new Map<Vehiculo, number>();
            const ganancias = new Map<Vehiculo, number>();

            // Configuramos matrículas mock
            jest.spyOn(mockVehiculo1, 'getMatricula').mockReturnValue('AUTO-UNO');
            jest.spyOn(mockVehiculo2, 'getMatricula').mockReturnValue('AUTO-DOS');
            jest.spyOn(mockVehiculo3, 'getMatricula').mockReturnValue('AUTO-TRES');

            costos.set(mockVehiculo1, 100);
            costos.set(mockVehiculo2, 150);
            costos.set(mockVehiculo3, 600);

            ganancias.set(mockVehiculo1, 800);
            ganancias.set(mockVehiculo2, 200);
            ganancias.set(mockVehiculo3, 500);

            const resultado = admin.obtenerRentabilidad(costos, ganancias);

            expect(resultado).toContain('Vehiculo más rentable: AUTO-UNO');
            expect(resultado).toContain('Vehiculo menos rentable: AUTO-TRES');
        })
    })
    describe('obtenerAutoMenosAlquilado', () => {
        it('debe devolver el vehiculo menos veces alquilado', () => {
            const autosAlquilados = new Map<Vehiculo, number>([
                [mockVehiculo1, 2],
                [mockVehiculo2, 5],
                [mockVehiculo3, 1]
            ]);
            const resultado = (admin as any).obtenerAutoMenosAlquilado(autosAlquilados);
            expect(resultado).toBe(mockVehiculo3);
        });

        it('debe devolver el primero en caso de que exista otro con la misma cantidad', () => {
             const autosAlquilados = new Map<Vehiculo, number>([
                [mockVehiculo2, 3],
                [mockVehiculo1, 3],
                [mockVehiculo3, 12]
            ]);
            const resultado = (admin as any).obtenerAutoMenosAlquilado(autosAlquilados);
            expect(resultado).toBe(mockVehiculo2);
        });
        
        it('debe devolver undefined si el mapa esta vacio', () => {
            const autosAlquilados = new Map<Vehiculo, number>();
            const resultado = (admin as any).obtenerAutoMenosAlquilado(autosAlquilados);
            expect(resultado).toBeUndefined();
        });
    });
    describe('obtenerEstadisticasVehiculosAlquilados', () =>{
        it('debe lanzar una excepcion si obtenerAlquileresEnRango devuelve un array vacio', () => {
            const fechaInicio = new Date('2025-01-01T00:00:00Z');
            const fechaFin = new Date('2025-01-02T00:00:00Z');

            const spyobtenerAlquileresEnRango = jest.spyOn(admin as any, 'obtenerAlquileresEnRango')
                                 .mockReturnValue([]);
            expect(() => {admin.obtenerEstadisticasVehiculosAlquilados(fechaInicio, fechaFin)}).toThrow("No hubo alquileres en el rango de fechas dado");
            expect(spyobtenerAlquileresEnRango).toHaveBeenCalledWith(fechaInicio, fechaFin);
        });

    it('debe orquestar todos los metodos', () => {
            const fechaInicio = new Date('2025-01-01T00:00:00Z');
            const fechaFin = new Date('2025-01-02T00:00:00Z');

            const mockAlquileres = [reservaMock, reservaMockDos];
            const mockAutosAlquilados = new Map<Vehiculo, number>([[mockVehiculo1, 3], [mockVehiculo2, 2]]);

            const spyobtenerAlquileresEnRango = jest.spyOn(admin as any, 'obtenerAlquileresEnRango')
                                 .mockReturnValue(mockAlquileres);

            const spycontarAlquileresPorVehiculo = jest.spyOn(admin as any, 'contarAlquileresPorVehiculo')
                                 .mockReturnValue(mockAutosAlquilados);

            const spyobtenerAutoMasAlquilado = jest.spyOn(admin as any, 'obtenerAutoMasAlquilado')
                               .mockReturnValue(mockVehiculo2);
            const spyobtenerAutoMenosAlquilado = jest.spyOn(admin as any, 'obtenerAutoMenosAlquilado')
                               .mockReturnValue(mockVehiculo1);

            const resultado = admin.obtenerEstadisticasVehiculosAlquilados(fechaInicio, fechaFin);

            expect(spyobtenerAlquileresEnRango).toHaveBeenCalledWith(fechaInicio, fechaFin);
            expect(spycontarAlquileresPorVehiculo).toHaveBeenCalledWith(mockAlquileres);
            expect(spyobtenerAutoMasAlquilado).toHaveBeenCalledWith(mockAutosAlquilados);
            expect(spyobtenerAutoMenosAlquilado).toHaveBeenCalledWith(mockAutosAlquilados);
        });
    });
    describe('chequearDisponibilidad', () => {
        const FECHA_INICIO = new Date('2025-10-01');
        const FECHA_FIN = new Date('2025-10-10');
        let vehiculo: MockVehiculo;

        beforeEach(() => {
            vehiculo = new MockVehiculo("000", 10);
        });

        it('debe devolver true si el vehiculo informa que puede ser alquilado', () => {
        
            const spyVehiculo = jest.spyOn(vehiculo, 'puedeSerAlquilado')
                                    .mockReturnValue(true);

            const resultado = admin.chequearDisponibilidad(vehiculo, FECHA_INICIO, FECHA_FIN);

            expect(resultado).toBe(true);
            expect(spyVehiculo).toHaveBeenCalledTimes(1);
            expect(spyVehiculo).toHaveBeenCalledWith(FECHA_INICIO, FECHA_FIN);

            spyVehiculo.mockRestore();
        });

        it('debe devolver false si el vehiculo informa que no puede ser alquilado', () => {
        
            const spyVehiculo = jest.spyOn(vehiculo, 'puedeSerAlquilado')
                                    .mockReturnValue(false);

            const resultado = admin.chequearDisponibilidad(vehiculo, FECHA_INICIO, FECHA_FIN);

            expect(resultado).toBe(false);
            expect(spyVehiculo).toHaveBeenCalledTimes(1);
            expect(spyVehiculo).toHaveBeenCalledWith(FECHA_INICIO, FECHA_FIN);

            spyVehiculo.mockRestore();
        });
    });

    describe('generarReserva', () => {
        let mockCliente: MockCliente;
        let mockVehiculo: MockVehiculo;
        let mockSolicitud: SolicitudReserva;
        let spyChequearDisp: jest.SpyInstance;
        let spyAgregarReservaVehiculo: jest.SpyInstance;

        const FECHA_INICIO = new Date('2025-11-01');
        const FECHA_FIN = new Date('2025-11-10');

        beforeEach(() => {
            mockCliente = new MockCliente('Cliente Test', '12345', '@mail', admin);
            mockVehiculo = new MockVehiculo('ABC-123', 0);

            mockSolicitud = new SolicitudReserva(mockCliente, mockVehiculo, FECHA_INICIO, FECHA_FIN);

            spyChequearDisp = jest.spyOn(admin, 'chequearDisponibilidad');

            spyAgregarReservaVehiculo = jest.spyOn(mockVehiculo, 'agregarReserva')
                                             .mockImplementation(() => {}); 
        });

        afterEach(() => {
            spyChequearDisp.mockRestore();
            spyAgregarReservaVehiculo.mockRestore();
        });

        it('debe crear una reserva y agregarla si el vehiculo esta disponible', () => {
            spyChequearDisp.mockReturnValue(true);

            admin.generarReserva(mockSolicitud);

            expect(spyChequearDisp).toHaveBeenCalledTimes(1);
            expect(spyChequearDisp).toHaveBeenCalledWith(mockVehiculo, FECHA_INICIO, FECHA_FIN);
            expect(admin.getReservas()).toHaveLength(1);
            expect(spyAgregarReservaVehiculo).toHaveBeenCalledTimes(1);
        });

        it('No debe crear una reserva si el vehiculo no esta disponible', () => {
            spyChequearDisp.mockReturnValue(false);

            admin.generarReserva(mockSolicitud);

            expect(spyChequearDisp).toHaveBeenCalledTimes(1);
            expect(spyChequearDisp).toHaveBeenCalledWith(mockVehiculo, FECHA_INICIO, FECHA_FIN);
            expect(admin.getReservas()).toHaveLength(0);
            expect(spyAgregarReservaVehiculo).not.toHaveBeenCalled();
        });
    });

    describe('altasAlquileresDelDia', () => {
        const HOY = new Date('2025-11-11T12:00:00');
        const HOY_FORMATEADO = "11/11/2025";
        const MANANA_FORMATEADO = "12/11/2025";

        let mockVehiculoHoy: MockVehiculo;
        let mockVehiculoManana: MockVehiculo;
        let spyAlquilarVehiculoHoy: jest.SpyInstance;
        let spyAlquilarVehiculoManana: jest.SpyInstance;

        beforeEach(() => {
            jest.useFakeTimers().setSystemTime(HOY);

            mockVehiculoHoy = new MockVehiculo('AUTO-HOY', 0);
            mockVehiculoManana = new MockVehiculo('AUTO-MANANA', 0);

            spyAlquilarVehiculoHoy = jest.spyOn(mockVehiculoHoy, 'alquilar').mockImplementation(() => {});
            spyAlquilarVehiculoManana = jest.spyOn(mockVehiculoManana, 'alquilar').mockImplementation(() => {});
        });

        afterEach(() => {
            jest.useRealTimers();
            spyAlquilarVehiculoHoy.mockRestore();
            spyAlquilarVehiculoManana.mockRestore();
        });

        it('debe llamar a alquilar() solo en vehiculos cuya reserva inicia hoy', () => {
            const mockReservaHoy = {
                getFechaInicioFormateada: jest.fn().mockReturnValue(HOY_FORMATEADO),
                getVehiculo: jest.fn().mockReturnValue(mockVehiculoHoy)
            }as unknown as Reserva;

            const mockReservaManana = {
                getFechaInicioFormateada: jest.fn().mockReturnValue(MANANA_FORMATEADO),
                getVehiculo: jest.fn().mockReturnValue(mockVehiculoManana)
            }as unknown as Reserva;

            admin['reservas'] = [mockReservaHoy, mockReservaManana];

            admin.altasAlquileresDelDia();

            expect(mockReservaHoy.getFechaInicioFormateada).toHaveBeenCalledTimes(1);
            expect(mockReservaManana.getFechaInicioFormateada).toHaveBeenCalledTimes(1);

            expect(spyAlquilarVehiculoHoy).toHaveBeenCalledTimes(1);
            expect(spyAlquilarVehiculoManana).not.toHaveBeenCalled();
        });

        it('no debe hacer nada si no hay reservas', () => {
            
            admin['reservas'] = [];

            expect(() => admin.altasAlquileresDelDia()).not.toThrow();
        });
    });
    describe('obtenerOcupacionDeFlota', () =>{
        it('debe informar el porcentaje de los autos que se encuentren en alquiler según la fecha pedida ', () => {
        let fechaPedida = new Date('2025-10-20T00:00:00Z');
  
        admin['reservas'] = [reservaMock,reservaMockDos,reservaMockTres];
        
        admin['vehiculos'] = [mockVehiculo1,mockVehiculo2,mockVehiculo3];
        
        const resultado = admin.obtenerOcupacionDeFlota(fechaPedida);
        const resultadoEsperado = (2/3) * 100;

        expect(resultado).toBe(resultadoEsperado);
        expect(reservaMock.getFechaFin).toHaveBeenCalled();
        expect(reservaMockDos.getFechaFin).toHaveBeenCalled();
        expect(reservaMockTres.getFechaFin).toHaveBeenCalled();
        expect(reservaMock.getFechaInicio).toHaveBeenCalled();
        expect(reservaMockDos.getFechaInicio).toHaveBeenCalled();
        expect(reservaMockTres.getFechaInicio).toHaveBeenCalled();

        });
    });
   
    describe('agregarCliente', () => {
        it('Agregar un cliente nuevo al array', () => {
            const cliente = new MockCliente('Raul', '123', '@mail', admin);
            admin.agregarCliente(cliente);
            expect(admin['clientes']).toContain(cliente);
        });
        it('si no se pasa por parametro un cliente, debe lanzar una excepcion', () => {
            admin['clientes'] = []

            expect(() => admin.agregarCliente(null as any)).toThrow('Cliente nulo o no existente');
            expect(admin['clientes']).toHaveLength(0);
        });

        it('si se intenta agregar un cliente que ya existe, debe lanzar una excepcion', () => {
            const cliente = new MockCliente('Raul', '123', '@mail', admin);
            admin['clientes'] = [cliente]

            
            expect(() => admin.agregarCliente(cliente)).toThrow('El cliente ya se encuentra en el array');
            expect(admin['clientes']).toHaveLength(1);
            expect(admin['clientes']).toContain(cliente);
        });

        });
           describe('getVehiculos', () => {
        it('debe retornar una lista con los vehiculos', () => {
            admin['vehiculos'] = [mockVehiculo1,mockVehiculo2];
            const resultado = admin.getVehiculos();
            
            expect(resultado).toContain(mockVehiculo1);
            expect(resultado).toContain(mockVehiculo2);
            expect(resultado).toHaveLength(2);
            expect(resultado[1]).toBe(mockVehiculo2);
        })
    })
    describe('getClientes', () => {
        
        it('debe retornar una lista de clientes' , () => {
            const clienteUno = new MockCliente('Raul', '123', '@mail', admin);
            const clienteDos = new MockCliente('Saul', '456', 'a@mail', admin);
            const clienteTres = new MockCliente('Saur', '789', 'p@mail', admin);
            admin ['clientes'] = [clienteDos,clienteUno,clienteTres];
            const resultado = admin.getClientes();
            
            expect(resultado).toContain(clienteDos);
            expect(resultado).toContain(clienteUno);
            expect(resultado).toContain(clienteTres);
            expect(resultado).toHaveLength(3);
            expect(resultado[0]).toBe(clienteDos);
        })
    })

    it('Cliente ya existe en el array', () => {
        const cliente1 = new MockCliente('Raul', '123', '@mail', admin);
        const cliente2 = new MockCliente('Raul', '123', '@mail', admin);

        admin.agregarCliente(cliente1);
        expect(() => admin.agregarCliente(cliente2)).toThrow('El cliente ya se encuentra en el array');
    });

    it('Quitar un cliente del array', () => {
        const cliente = new MockCliente('Raul', '123', '@mail', admin);
        admin.agregarCliente(cliente);
        admin.quitarCliente(cliente);
        expect(admin['clientes']).not.toContain(cliente);
    });

    it('Agregar un vehiculo nuevo al array', () => {
        const vehiculo = new MockVehiculo("000", 10);
        admin.agregarVehiculo(vehiculo);
        expect(admin['vehiculos']).toContain(vehiculo);
    });

    it('Vehiculo ya existe en el array', () => {
        const vehiculo1 = new MockVehiculo("000", 10);
        const vehiculo2 = new MockVehiculo("000", 10);
        admin.agregarVehiculo(vehiculo1);
        expect(() => admin.agregarVehiculo(vehiculo2)).toThrow('El vehiculo ya se encuentra en el array');
    });

    it('Vehiculo ya existe en el array', () => {
        admin['vehiculos'] = [mockVehiculo1,mockVehiculo2];

        expect(() => admin.agregarVehiculo(null as any)).toThrow('Vehiculo nulo o no existente');
        expect(admin['vehiculos']).toHaveLength(2);
    });

    it('Quitar un vehiculo del array', () => {
        const vehiculo = new MockVehiculo("000", 10);
        admin.agregarVehiculo(vehiculo);
        admin.quitarVehiculo(vehiculo);
        expect(admin['vehiculos']).not.toContain(vehiculo);
    });
})


 
