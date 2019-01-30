export interface IContatoEstabelecimento {
    id?: number;
    nome?: string;
    telefone?: string;
    email?: string;
    estabelecimentoComercialId?: number;
}

export class ContatoEstabelecimento implements IContatoEstabelecimento {
    constructor(
        public id?: number,
        public nome?: string,
        public telefone?: string,
        public email?: string,
        public estabelecimentoComercialId?: number
    ) {}
}
