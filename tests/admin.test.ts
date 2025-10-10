import Admin from '../src/admin';
import Cliente from '../src/cliente';
import Estado from '../src/estados/estado';
import Vehiculo from '../src/vehiculos/vehiculo';

class MockEstado extends Estado{
}

class MockVehiculo extends Vehiculo{
    constructor(matricula:string, estado: MockEstado, kilometraje:number) {
        super(matricula, estado, kilometraje);
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

    it('Chequear disponibilidad (true)', () => {
        const estado = new MockEstado('Disponible')
        const vehiculoDisponible = new MockVehiculo("000", estado, 10);
        const resultado = admin.chequearDisponibilidad(vehiculoDisponible);
        expect(resultado).toBe(true);
    });

    it('Chequear disponibilidad (false)', () => {
        const estado = new MockEstado('Mantenimiento')
        const vehiculoDisponible = new MockVehiculo("000", estado, 10);
        const resultado = admin.chequearDisponibilidad(vehiculoDisponible);
        expect(resultado).toBe(false);
    });  

    it('Agregar un cliente nuevo al array', () => {
        const cliente = new MockCliente('Sofia', '123', '@mail');
        admin.agregarCliente(cliente);
        expect(admin['clientes']).toContain(cliente);
    });

    it('Cliente ya existe en el array', () => {
        const cliente1 = new MockCliente('Sofia', '123', '@mail');
        const cliente2 = new MockCliente('Sofia', '123', '@mail');
        admin.agregarCliente(cliente1);
        expect(() => admin.agregarCliente(cliente2)).toThrow('Crear clase error cliente ya esta en array');
    });

    it('Agregar un vehiculo nuevo al array', () => {
        const estado = new MockEstado('Disponible')
        const vehiculo = new MockVehiculo("000", estado, 10);
        admin.agregarVehiculo(vehiculo);
        expect(admin['vehiculos']).toContain(vehiculo);
    });

    it('Vehiculo ya existe en el array', () => {
        const estado = new MockEstado('Disponible')
        const vehiculo1 = new MockVehiculo("000", estado, 10);
        const vehiculo2 = new MockVehiculo("000", estado, 10);
        admin.agregarVehiculo(vehiculo1);
        expect(() => admin.agregarVehiculo(vehiculo2)).toThrow('Crear clase error vehiculo ya esta en array');
    });
});
