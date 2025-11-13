import Vehiculo from "./vehiculos/vehiculo";
import Reserva from "./reserva";
import Cliente from "./cliente";
import SolicitudReserva from "./solicitudReserva";
import moment from "moment";

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
    public chequearDisponibilidad(vehiculo: Vehiculo, fechaInicioSolicitada: Date, fechaFinSolicitada: Date):boolean {
        return vehiculo.puedeSerAlquilado(fechaInicioSolicitada, fechaFinSolicitada);
    }

    /**
    * Genera una reserva para un cliente y un vehículo.
    * @param {Cliente} Cliente que solicita la reserva.
    * @param {Vehiculo} Vehiculo a reservar.
    * @returns void
    */

    public generarReserva(solicitudReserva: SolicitudReserva):void {
        if (this.chequearDisponibilidad(solicitudReserva.getVehiculo(), solicitudReserva.getFechaInicio(), solicitudReserva.getFechaFin())){
            let nuevaReserva = new Reserva(solicitudReserva.getCliente(), solicitudReserva.getVehiculo(), solicitudReserva.getFechaInicio(), solicitudReserva.getFechaFin());
            this.reservas.push(nuevaReserva);
            solicitudReserva.getVehiculo().agregarReserva(nuevaReserva);
        }
    }


    /**
    * Pone en estado alquiler los vehiculos que comienzan una reserva ese día.
    */
    public altasAlquileresDelDia(): void{
        this.reservas.forEach(reserva => {
            if(reserva.getFechaInicioFormateada() == moment().format("DD/MM/YYYY")){
                reserva.getVehiculo().alquilar();
            }
        })
    }

    /**
    * Calcula el porcentaje de vehiculos alquilados en un momento dado. 
    * @param {Date} fechaPedida - Fecha que se desea evaluar
    * @returns {number} porcentajeVehiculosAlquilados (0 a 100)
    */
    public obtenerOcupacionDeFlota(fechaPedida: Date): number{
        let fechaMoment = moment(fechaPedida);
        let reservasActivas : Array<Reserva> = [];

        reservasActivas = this.reservas.filter((reserva) => { return fechaMoment.isBetween(
            moment(reserva.getFechaInicio()), moment(reserva.getFechaFin()), undefined, '[]'
        )})

        const cantidadAlquileresActivos = reservasActivas.length;
        
        const vehiculosTotales = this.vehiculos.length;

        const porcentajeVehiculosAlquilados = (cantidadAlquileresActivos/vehiculosTotales) * 100;

        return porcentajeVehiculosAlquilados;
    }
    

    // RECORTAR ESTO POR FAVOR, METODO DE 300 LINEAS    

    /**
    * Calcula el vehiculo más y menos alquilados en un período determinado. 
    * @param {Date} fechaPedida - Fecha que se desea evaluar
    * @param {Date} fechaFin - Fecha que se desea evaluar
    * @returns 
    */
    /*
    public obtenerEstadisticasVehiculosAlquilados(fechaInicio: Date, fechaFin: Date): string{
        const fechaInicioMoment = moment(fechaInicio);
        const fechaFinMoment = moment(fechaFin);
        let alquileresCumplidos : Array<Reserva> = [];
                    
        alquileresCumplidos = this.reservas.filter((reserva) => { 
            return (moment(reserva.getFechaInicio()).isSameOrBefore(fechaFinMoment) && 
                    (moment(reserva.getFechaFin())).isSameOrAfter(fechaInicioMoment)
            );
        }
        )    

        let alquileresPorAuto : Map <string,number> = new Map();
    
        alquileresCumplidos.forEach(alquilerCumplido => {
            let matricula : string = alquilerCumplido.getVehiculo().getMatricula();
           
            if(alquileresPorAuto.has(matricula)){
                let vecesAlquilado : number = alquileresPorAuto.get(matricula)!;
                alquileresPorAuto.set(matricula, vecesAlquilado + 1);
            } else {
                alquileresPorAuto.set(matricula,1)
            }
        });
                
        let maxAlquileres : number = -1;
        let minAlquileres  : number = Infinity; 
        let vehiculoMasAlquilado : string = "";
        let vehiculoMenosAlquilado : string = "";

        for (const [matricula, vecesAlquilado] of alquileresPorAuto) {
            if (vecesAlquilado > maxAlquileres) {
                maxAlquileres = vecesAlquilado;
                vehiculoMasAlquilado = matricula;
            }
            if (vecesAlquilado < minAlquileres) {
                minAlquileres = vecesAlquilado;
                vehiculoMenosAlquilado = matricula;
            }
        }
            //very bad !!! :C
        return `${vehiculoMasAlquilado}|${vehiculoMenosAlquilado}`;

    }
    */
    
    /**
    * Devuelve los alquileres cumplidos en un rango de fechas dado 
    * @param {Date} fechaPedida - Fecha que se desea evaluar
    * @param {Date} fechaFin - Fecha que se desea evaluar
    * @returns {Array<Reserva>} alquileresCumplidos
    */
    private obtenerAlquileresEnRango(fechaInicio: Date, fechaFin:Date): Reserva[]{
        const fechaInicioMoment = moment(fechaInicio);
        const fechaFinMoment = moment(fechaFin);
        let alquileresCumplidos : Array<Reserva> = [];
                    
        alquileresCumplidos = this.reservas.filter((reserva) => { 
            return (moment(reserva.getFechaInicio()).isSameOrBefore(fechaFinMoment) && 
                    (moment(reserva.getFechaFin())).isSameOrAfter(fechaInicioMoment)
            );
        })
        
        return alquileresCumplidos;
    } 

    /**
    * Toma una lista de alquileres y la agrupa contando cuantas veces aparece cada vehiculo.
    * @param {Array<Reserva>} alquileres
    * @returns {Map<Vehiculo,number>} - alquileresPorAuto
    */
    private contarAlquileresPorVehiculo(alquileres: Reserva[]): Map<Vehiculo,number>{
        const alquileresPorAuto : Map <Vehiculo,number> = new Map();
        alquileres.forEach(alquiler => {
            let vehiculo : Vehiculo = alquiler.getVehiculo();
           
            if(alquileresPorAuto.has(vehiculo)){
                let vecesAlquilado : number = alquileresPorAuto.get(vehiculo)!;
                alquileresPorAuto.set(vehiculo, vecesAlquilado + 1);
            } else {
                alquileresPorAuto.set(vehiculo,1)
            }
        });
        return alquileresPorAuto; 
    }

    /**
    * Devuelve el vehiculo que mas veces fue alquilado
    * @param {Map <Vehiculo,number>} autosAlquilados 
    * @returns {Vehiculo} vehiculoMasAlquilado
    */
    private obtenerAutoMasAlquilado(autosAlquilados: Map <Vehiculo,number>): Vehiculo{            
        let maxAlquileres : number = -1;
        let vehiculoMasAlquilado : Vehiculo;
        
        for (const [vehiculo, vecesAlquilado] of autosAlquilados) {
            if (vecesAlquilado > maxAlquileres) {
                maxAlquileres = vecesAlquilado;
                vehiculoMasAlquilado = vehiculo ;
            }
        }
        return vehiculoMasAlquilado!;   
    }

    /**
    * Devuelve el vehiculo que menos veces fue alquilado
    * @param {Map <Vehiculo,number>} autosAlquilados 
    * @returns {Vehiculo} vehiculoMenosAlquilado
    */
    private obtenerAutoMenosAlquilado(autosAlquilados: Map <Vehiculo,number>): Vehiculo{               
        let minAlquileres : number = Infinity;
        let vehiculoMenosAlquilado : Vehiculo;
        
        for (const [vehiculo, vecesAlquilado] of autosAlquilados) {
            if (vecesAlquilado < minAlquileres) {
                minAlquileres = vecesAlquilado;
                vehiculoMenosAlquilado = vehiculo ;
            }
        }

        return vehiculoMenosAlquilado!;     
    }
    /**
    * Calcula el vehiculo más y menos alquilados en un período determinado. 
    * @param {Date} fechaPedida - Fecha que se desea evaluar
    * @param {Date} fechaFin - Fecha que se desea evaluar
    * @returns ??
    */
    public obtenerEstadisticasVehiculosAlquilados(fechaInicio: Date, fechaFin: Date): string{
        const alquileresEnRango = this.obtenerAlquileresEnRango(fechaInicio, fechaFin);
        
        if (alquileresEnRango.length === 0) {
            //lanzar excepcion
            throw new Error( "No hubo alquileres en el rango de fechas dado");
        }

        const alquileresPorVehiculo = this.contarAlquileresPorVehiculo(alquileresEnRango);
        const vehiculoMasAlquilado = this.obtenerAutoMasAlquilado(alquileresPorVehiculo);
        const vehiculoMenosAlquilado = this.obtenerAutoMenosAlquilado(alquileresPorVehiculo);

        return "estadisticas";
    }

    /* 
        Rentabilidad por Vehículo: El automóvil que generó la mayor y menor rentabilidad
        (ingresos por alquiler - costos de mantenimiento).
        
    */

    public obtenerMasRentable(): Vehiculo{
        let maxRentable : number = -1;
        let vehiculoMasRentable : string = "";
        
        return this.vehiculos[1] ;
    }
    
    public obtenerMenosRentable(): Vehiculo{
        let minRentable : number =  Infinity;
        let vehiculoMenosRentable : string = "";
        
        return this.vehiculos[1] ;
    }

    public obtenerCostosMantenimiento():number{
        let costoMantenimiento = Math.floor((Math.random() * 101) + 50);
        return costoMantenimiento;
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