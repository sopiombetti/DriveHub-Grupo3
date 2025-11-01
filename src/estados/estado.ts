export default interface Estado {
    alquilar(): void;
    ponerEnMantenimiento():void;
    ponerEnLimpieza(): void;
    ponerDisponible(): void;
    puedeSerAlquilado(): boolean;
}