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

class MockCliente extends Cliente{
}

describe('Tests clase Admin', () => {
    let admin: Admin;

    beforeEach(() => {
        admin = new Admin();
    });

    /*it('Chequear disponibilidad (true)', () => {
        const vehiculoDisponible = new MockVehiculo("000", 10);
        const resultado = admin.chequearDisponibilidad(vehiculoDisponible);
        expect(resultado).toBe(true);
    });*/

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
            mockCliente = new MockCliente('Cliente Test', '12345', '@mail');
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



    it('Agregar un cliente nuevo al array', () => {
        const cliente = new MockCliente('Sofia', '123', '@mail');
        admin.agregarCliente(cliente);
        expect(admin['clientes']).toContain(cliente);
    });

    it('Cliente ya existe en el array', () => {
        const cliente1 = new MockCliente('Sofia', '123', '@mail');
        const cliente2 = new MockCliente('Sofia', '123', '@mail');

        // const clientex: Cliente = { 
        //     getDni: jest.fn().mockReturnValue('123')
        // } as any;

        admin.agregarCliente(cliente1);
        expect(() => admin.agregarCliente(cliente2)).toThrow('El cliente ya se encuentra en el array');
    });

    it('Quitar un cliente del array', () => {
        const cliente = new MockCliente('Sofia', '123', '@mail');
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

    it('Quitar un vehiculo del array', () => {
        const vehiculo = new MockVehiculo("000", 10);
        admin.agregarVehiculo(vehiculo);
        admin.quitarVehiculo(vehiculo);
        expect(admin['vehiculos']).not.toContain(vehiculo);
    });
});
