import Vehiculo from "./vehiculo";
import Reserva from "./reserva";
import Cliente from "./cliente";


export default class Admin extends Persona {

    private clientes : Array<Cliente>;
    private reservas: Array<Reserva>;
    private vehiculos: Array<Vehiculo>;

    constructor() {
        super();
        this.clientes = [];
        this.reservas = [];
        this.vehiculos = [];
    }

    public chequearDisponibilidad(vehiculo: Vehiculo): boolean {
        let disponibilidad: boolean = true;
        if (vehiculo.getEstado() !== "Disponible") {
            disponibilidad = false;
        }
        return disponibilidad;
    }

    public generarReserva (cliente: Cliente, vehiculo: Vehiculo) {
        // codigo para generar nueva reserva, a charlar todavia.
        var nuevaReserva = new Reserva();

    }

    public getClientes (): Array<Cliente> {
        return this.clientes;
    }
    public getReservas(): Array<Reserva> {
        return this.reservas;
    }
    public getVehiculos (): Array<Vehiculo> {
        return this.vehiculos;
    }

    public setClientes() {
        // Nota de Juani: creo que en vez de setter, deberiamos tener un metodo para agregar un elemento al array y otro para eliminarlo.
    }
    public setReservas() {
        // Nota de Juani: creo que en vez de setter, deberiamos tener un metodo para agregar un elemento al array y otro para eliminarlo.

    }
    public setVehiculos() {
        // Nota de Juani: creo que en vez de setter, deberiamos tener un metodo para agregar un elemento al array y otro para eliminarlo.

    }
}