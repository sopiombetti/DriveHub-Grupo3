import Vehiculo from "./vehiculo";
import Reserva from "./reserva";
import Cliente from "./cliente";
import SolicitudReserva from "./solicitudReserva";
/**
Administra clientes, vehículos y reservas.  
Permite verificar disponibilidad y gestionar las listas.
*/
export default class Admin {

    private clientes : Array<Cliente>;
    private reservas: Array<Reserva>;
    private vehiculos: Array<Vehiculo>;

    /**
    * @constructor
    * Inicializa el administrador con colecciones vacías de clientes, reservas y vehículos.
    */
    constructor() {
        this.clientes = [];
        this.reservas = [];
        this.vehiculos = [];
    }

    /**
    * Verifica si un vehículo está disponible.
    * 
    * @param Vehiculo Vehículo a evaluar.
    * @returns boolean
    */
    public chequearDisponibilidad(vehiculo: Vehiculo): boolean {
        let disponibilidad: boolean = true;
        if (vehiculo.getEstado() !== "Disponible") {
            disponibilidad = false;
        }
        return disponibilidad;
    }

    /**
    * Genera una reserva para un cliente y un vehículo.
    * @param Cliente Cliente que solicita la reserva.
    * @param Vehiculo Vehículo a reservar.
    * @returns void
    */

    public generarReserva (solicitudReserva: SolicitudReserva) {
        if (this.chequearDisponibilidad(solicitudReserva.getVehiculo())){
            let nuevaReserva = new Reserva(solicitudReserva.getCliente(), solicitudReserva.getVehiculo(), solicitudReserva.getFechaInicio(), solicitudReserva.getFechaFin());
            this.reservas.push(nuevaReserva);
        }
    }

    /**
    * Devuelve la lista de clientes.
    * @returns Cliente[]
    */
    public getClientes (): Array<Cliente> {
        return this.clientes;
    }

    /**
    * Devuelve la lista de reservas.
    * @returns Reserva[]
    */
    public getReservas(): Array<Reserva> {
        return this.reservas;
    }

    /**
    * Devuelve la lista de vehículos.
    * @returns Vehiculo[]
    */
    public getVehiculos (): Array<Vehiculo> {
        return this.vehiculos;
    }

    public agregarCliente(cliente: Cliente) {
        if (! cliente){
            throw new Error (`Cliente nulo o no existente`)
        }
        if(this.clientes.find((cli) => cli.getDni() == cliente.getDni()) ) {
            throw new Error (`Crear clase error cliente ya esta en array`)
        }
        this.clientes.push(cliente)
    }

    public quitarCliente (cliente: Cliente) {
        if( this.clientes.find((cli) => cli.getDni() == cliente.getDni())) {
            let nuevoArray = this.clientes.filter((cli) => cli.getDni() !== cliente.getDni() );
            this.clientes = nuevoArray;
        }
    }
    
    public agregarVehiculo(vehiculo: Vehiculo) {
        if (! vehiculo){
            throw new Error (`Cliente nulo o no existente`)
        }
        if(this.vehiculos.find((cli) => cli.getMatricula() == vehiculo.getMatricula()) ) {
            throw new Error (`Crear clase error cliente ya esta en array`)
        }
        this.vehiculos.push(vehiculo)
    }

    public quitarVehiculo (vehiculo: Vehiculo) {
        if( this.vehiculos.find((cli) => cli.getMatricula() == vehiculo.getMatricula())) {
            let nuevoArray = this.vehiculos.filter((cli) => cli.getMatricula() !== vehiculo.getMatricula() );
            this.vehiculos = nuevoArray;
        }
    }
}