export interface ICategoriaEstabelecimento {
    id?: number;
    nome?: string;
    bolAtivo?: boolean;
}

export class CategoriaEstabelecimento implements ICategoriaEstabelecimento {
    constructor(public id?: number, public nome?: string, public bolAtivo?: boolean) {
        this.bolAtivo = this.bolAtivo || false;
    }
}
