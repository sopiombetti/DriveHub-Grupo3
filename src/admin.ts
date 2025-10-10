import Vehiculo from "./vehiculos/vehiculo";
import Reserva from "./reserva";
import Cliente from "./cliente";
import SolicitudReserva from "./solicitudReserva";
/**
Administra clientes, vehículos y reservas.  
Permite verificar disponibilidad y gestionar las listas.
*/
export default class Admin {

    private clientes: Array<Cliente>;
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
    * @param {Vehiculo} Vehiculo a evaluar.
    * @returns {boolean}
    */
    public chequearDisponibilidad(vehiculo: Vehiculo):boolean {
        let disponibilidad: boolean = true;
        if (vehiculo.getEstado() !== "Disponible") {
            disponibilidad = false;
        }
        return disponibilidad;
    }

    /**
    * Genera una reserva para un cliente y un vehículo.
    * @param {Cliente} Cliente que solicita la reserva.
    * @param {Vehiculo} Vehiculo a reservar.
    * @returns void
    */

    public generarReserva(solicitudReserva: SolicitudReserva):void {
        if (this.chequearDisponibilidad(solicitudReserva.getVehiculo())){
            let nuevaReserva = new Reserva(solicitudReserva.getCliente(), solicitudReserva.getVehiculo(), solicitudReserva.getFechaInicio(), solicitudReserva.getFechaFin());
            this.reservas.push(nuevaReserva);
        }
    }

    /**
    * Devuelve la lista de clientes.
    * @returns {Array<Cliente>}
    */
    public getClientes():Array<Cliente> {
        return this.clientes;
    }

    /**
    * Devuelve la lista de reservas.
    * @returns {Array<Reserva>}
    */
    public getReservas():Array<Reserva> {
        return this.reservas;
    }

    /**
    * Devuelve la lista de vehículos.
    * @returns {Array<Vehiculo>}
    */
    public getVehiculos():Array<Vehiculo> {
        return this.vehiculos;
    }

    /**
    * Agrega un cliente nuevo a la lista de clientes
    * @param {Cliente} Cliente Recibe el cliente que hizo uno reserva.
    */
    public agregarCliente(cliente: Cliente):void {
        if (!cliente){
            throw new Error('Cliente nulo o no existente');
        }
        if(this.clientes.find((cli) => cli.getDni() == cliente.getDni()) ) {
            throw new Error('El cliente ya se encuentra en el array');
        }
        this.clientes.push(cliente);
    }

    /**
    * Elimina un cliente de la lista de clientes
    * @param {Cliente} Cliente Recibe el cliente a eliminar.
    */
    public quitarCliente(cliente: Cliente):void {
        if(this.clientes.find((cli) => cli.getDni() == cliente.getDni())){
            let nuevoArray = this.clientes.filter((cli) => cli.getDni() !== cliente.getDni());
            this.clientes = nuevoArray;
        }
    }
    
    /**
    * Agrega un nuevo Vehiculo a la lista de vehiculos
    * @param {Vehiculo} Vehiculo Recibe el vehiculo a agregar.
    */
    public agregarVehiculo(vehiculo: Vehiculo):void {
        if (!vehiculo){
            throw new Error('Vehiculo nulo o no existente');
        }
        if(this.vehiculos.find((cli) => cli.getMatricula() == vehiculo.getMatricula())){
            throw new Error('El vehiculo ya se encuentra en el array');
        }
        this.vehiculos.push(vehiculo);
    }
    
    /**
    * Elimina un Vehiculo de la lista de vehiculos
    * @param {Vehiculo} Vehiculo Recibe el vehiculo a eliminar.
    */
    public quitarVehiculo(vehiculo: Vehiculo):void {
        if(this.vehiculos.find((cli) => cli.getMatricula() == vehiculo.getMatricula())){
            let nuevoArray = this.vehiculos.filter((cli) => cli.getMatricula() !== vehiculo.getMatricula());
            this.vehiculos = nuevoArray;
        }
    }
}