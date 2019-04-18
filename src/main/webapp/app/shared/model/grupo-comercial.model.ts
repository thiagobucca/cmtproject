export interface IGrupoComercial {
    id?: number;
    nome?: string;
    status?: boolean;
}

export class GrupoComercial implements IGrupoComercial {
    constructor(public id?: number, public nome?: string, public status?: boolean) {
        this.status = this.status || true;
    }
}
