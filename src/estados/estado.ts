export default interface IEstado {
    alquilar(): void;
    ponerEnMantenimiento():void;
    ponerEnLimpieza(): void;
    ponerDisponible(): void;

    puedeSerAlquilado(): boolean;
}