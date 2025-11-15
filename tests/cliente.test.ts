import Cliente from '../src/cliente';
import Vehiculo from '../src/vehiculos/vehiculo';
import SolicitudReserva from '../src/solicitudReserva';


jest.mock('../src/solicitudReserva');


class MockVehiculo extends Vehiculo{
    constructor(matricula:string, kilometraje:number) {
        super(matricula, kilometraje);
    }
    condicionCargosExtra(kmTotales: number, diasTotales: number): boolean { return true; }
}


describe('Tests de Cliente', () => {

    let cliente: Cliente;
    let mockVehiculo: MockVehiculo;
    const MockSolicitudReserva = SolicitudReserva as jest.MockedClass<typeof SolicitudReserva>;

    const FECHA_INICIO = new Date('2025-12-01');
    const FECHA_FIN = new Date('2025-12-10');

    beforeEach(() => {
        
        MockSolicitudReserva.mockClear();

        cliente = new Cliente('Ana', '123', '@mail');
        mockVehiculo = new MockVehiculo('ABC-123', 0);
    });

    it('debería llamar al constructor de SolicitudReserva con los datos correctos', () => {
      
        cliente.generarSolicitud(mockVehiculo, FECHA_INICIO, FECHA_FIN);

        expect(MockSolicitudReserva).toHaveBeenCalledTimes(1);

        expect(MockSolicitudReserva).toHaveBeenCalledWith(cliente, mockVehiculo, FECHA_INICIO, FECHA_FIN);
    });
});