import { ILojaMaconica } from 'app/shared/model//loja-maconica.model';

export const enum TipoPessoa {
    Macom = 'Macom',
    Dependente = 'Dependente'
}

export interface IComunicacaoPush {
    id?: number;
    titulo?: string;
    conteudoPush?: string;
    tipoPessoa?: TipoPessoa;
    lojaMaconicas?: ILojaMaconica[];
}

export class ComunicacaoPush implements IComunicacaoPush {
    constructor(
        public id?: number,
        public titulo?: string,
        public conteudoPush?: string,
        public tipoPessoa?: TipoPessoa,
        public lojaMaconicas?: ILojaMaconica[]
    ) {}
}
