import Admin from '../src/admin';
import Cliente from '../src/cliente';
import Vehiculo from '../src/vehiculos/vehiculo';


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
