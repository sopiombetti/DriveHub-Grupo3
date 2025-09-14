export default abstract class Estado {
    protected tipoEstado: string;

    constructor(tipoEstado: string) {
        this.tipoEstado = tipoEstado;
    }

    public getTipoEstado(): string {
        return this.tipoEstado;
    }

    public setTipoEstado(tipoEstado: string): void {
        this.tipoEstado = tipoEstado;
    }
}