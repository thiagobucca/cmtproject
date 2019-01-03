export interface IPerfilUsuario {
    id?: number;
    nomePerfil?: string;
    bolAtivo?: boolean;
}

export class PerfilUsuario implements IPerfilUsuario {
    constructor(public id?: number, public nomePerfil?: string, public bolAtivo?: boolean) {
        this.bolAtivo = this.bolAtivo || false;
    }
}
