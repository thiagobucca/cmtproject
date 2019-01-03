import { Moment } from 'moment';
import { ILojaMaconica } from 'app/shared/model//loja-maconica.model';
import { IPessoa } from 'app/shared/model//pessoa.model';

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
    lojaMaconica?: ILojaMaconica;
    dependente?: IPessoa;
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
        public lojaMaconica?: ILojaMaconica,
        public dependente?: IPessoa
    ) {
        this.bolAtivo = this.bolAtivo || false;
    }
}
