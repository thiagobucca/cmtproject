import { IEstabelecimentoComercial } from 'app/shared/model//estabelecimento-comercial.model';

export interface IContatoEstabelecimento {
    id?: number;
    nome?: string;
    telefone?: string;
    email?: string;
    estabelecimentoComercial?: IEstabelecimentoComercial;
}

export class ContatoEstabelecimento implements IContatoEstabelecimento {
    constructor(
        public id?: number,
        public nome?: string,
        public telefone?: string,
        public email?: string,
        public estabelecimentoComercial?: IEstabelecimentoComercial
    ) {}
}
