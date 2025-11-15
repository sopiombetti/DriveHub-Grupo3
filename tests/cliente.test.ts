import Cliente from '../src/cliente';
import Vehiculo from '../src/vehiculos/vehiculo';
import SolicitudReserva from '../src/solicitudReserva';
import Admin from '../src/admin'; 


jest.mock('../src/admin'); 

class MockVehiculo extends Vehiculo{
    constructor(matricula:string, kilometraje:number) {
        super(matricula, kilometraje);
    }
    condicionCargosExtra(kmTotales: number, diasTotales: number): boolean { return true; }
}


describe('Tests de Cliente', () => {

    let cliente: Cliente;
    let mockAdmin: Admin; 
    let mockVehiculo: MockVehiculo;
    const MockedAdmin = Admin as jest.MockedClass<typeof Admin>; 

    const FECHA_INICIO = new Date('2025-12-01');
    const FECHA_FIN = new Date('2025-12-10');

    beforeEach(() => {
        
        MockedAdmin.mockClear(); 
        mockAdmin = new MockedAdmin(); 

        cliente = new Cliente('Ana', '123', '@mail', mockAdmin);
        mockVehiculo = new MockVehiculo('ABC-123', 0);
    });

    it('debe crear una solicitud y enviarla al Admin con los datos correctos', () => {

        cliente.generarSolicitud(mockVehiculo, FECHA_INICIO, FECHA_FIN);


        expect(mockAdmin.generarReserva).toHaveBeenCalledTimes(1);
        

        const solicitudPasada: SolicitudReserva = (mockAdmin.generarReserva as jest.Mock).mock.calls[0][0];


        expect(solicitudPasada).toBeInstanceOf(SolicitudReserva);
        expect(solicitudPasada.getCliente()).toBe(cliente);
        expect(solicitudPasada.getVehiculo()).toBe(mockVehiculo);
        expect(solicitudPasada.getFechaInicio()).toBe(FECHA_INICIO);
        expect(solicitudPasada.getFechaFin()).toBe(FECHA_FIN);
    });
});