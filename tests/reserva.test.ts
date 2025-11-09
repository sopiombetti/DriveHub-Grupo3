import Reserva from '../src/reserva';
import Cliente from '../src/cliente'; 
import Vehiculo from '../src/vehiculos/vehiculo';
import TemporadaAlta from '../src/temporadas/temporadaAlta';
import Temporada from '../src/temporadas/temporada';

class MockVehiculo extends Vehiculo {
    constructor() {
        super('ABC123', 10000); 
    }

    public condicionCargosExtra(kmTotales: number, diasTotales: number): boolean {
        return false; 
    }
}

class MockCliente extends Cliente {
    constructor() {
        
        super('12345678', 'Juan Perez', 'juan@example.com');
    }
    
    public devolverVehiculo(vehiculo: Vehiculo): number {
        return 12000;
    }
}

type TemporadaLike = Pick<
  Temporada,
  "getPorcentajeTarifa"
>;

describe('Test Clase Reserva', () => {
    
    let mockCliente: MockCliente;
    let mockVehiculo: MockVehiculo;
    let fechaInicio: Date;
    let fechaFin: Date;
    let reserva: Reserva;
    let temporadaAltaMock: jest.Mocked<TemporadaLike>;
    let temporadaMediaMock: jest.Mocked<TemporadaLike>;
    let temporadaBajaMock: jest.Mocked<TemporadaLike>;
        
    beforeEach(() => {
        mockCliente = new MockCliente();
        mockVehiculo = new MockVehiculo();
        fechaInicio = new Date('2025-10-20');
        fechaFin = new Date('2025-10-25');

        reserva = new Reserva(mockCliente, mockVehiculo, fechaInicio, fechaFin);

        temporadaAltaMock = {
            getPorcentajeTarifa: jest.fn().mockReturnValue(1.2)
        }

        temporadaMediaMock = {
            getPorcentajeTarifa: jest.fn().mockReturnValue(1)
        }

        temporadaBajaMock = {
            getPorcentajeTarifa: jest.fn().mockReturnValue(0.9)
        }
    });  
        
    it('debería ser una instancia de Reserva', () => {
        
        expect(reserva).toBeInstanceOf(Reserva);
    }); 

    it('debería inicializar las propiedades correctamente', () => {
         
        expect(reserva.getCliente()).toBe(mockCliente);
        expect(reserva.getVehiculo()).toBe(mockVehiculo);
        expect(reserva.getFechaInicio()).toBe(fechaInicio);
        expect(reserva.getFechaFin()).toBe(fechaFin);
    });

    it('Cambio de temporada - Alta', () => {
        reserva.setTemporada(temporadaAltaMock);
        expect(reserva.getTemporada().getPorcentajeTarifa()).toBe(1.2);
    })

    it('Cambio de temporada - Baja', () => {
        reserva.setTemporada(temporadaBajaMock);
        expect(reserva.getTemporada().getPorcentajeTarifa()).toBe(0.9);
    })

    it('debería calcular correctamente el número de días totales de la reserva', () => {
       
        const diasTotales = reserva.calcularDiasTotales();
        const diasEsperados = 5;
    
        expect(diasTotales).toBe(diasEsperados);

    });

    it('debería calcular correctamente los kilómetros totales recorridos', () => {
        
        const kmTotalesCalculados = reserva.calcularKmTotales();

        const kmInicialEsperado = 10000;
        const kmFinalSimulado = 12000;
        const kmTotalesEsperados = kmFinalSimulado - kmInicialEsperado;
        expect(kmTotalesCalculados).toBe(kmTotalesEsperados);

    });

});