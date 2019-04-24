export interface IGrupoComercial {
    id?: number;
    nome?: string;
    bolAtivo?: boolean;
}

export class GrupoComercial implements IGrupoComercial {
    constructor(public id?: number, public nome?: string, public bolAtivo?: boolean) {
        this.bolAtivo = this.bolAtivo || true;
    }
}
