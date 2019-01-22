import { Moment } from 'moment';

export const enum TipoPessoa {
    Macom = 'Macom',
    Dependente = 'Dependente'
}

export interface IPessoa {
    id?: number;
    nome?: string;
    telefone?: string;
    email?: string;
    tipoPessoa?: TipoPessoa;
    senha?: string;
    dataNascimento?: Moment;
    bolAtivo?: boolean;
    pessoaDependenteId?: number;
    lojaMaconicaId?: number;
}

export class Pessoa implements IPessoa {
    constructor(
        public id?: number,
        public nome?: string,
        public telefone?: string,
        public email?: string,
        public tipoPessoa?: TipoPessoa,
        public senha?: string,
        public dataNascimento?: Moment,
        public bolAtivo?: boolean,
        public pessoaDependenteId?: number,
        public lojaMaconicaId?: number
    ) {
        this.bolAtivo = this.bolAtivo || false;
    }
}
