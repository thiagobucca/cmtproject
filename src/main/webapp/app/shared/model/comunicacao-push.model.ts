export const enum TipoPessoa {
    Macom = 'Macom',
    Dependente = 'Dependente'
}

export interface IComunicacaoPush {
    id?: number;
    titulo?: string;
    conteudoPush?: string;
    tipoPessoa?: TipoPessoa;
}

export class ComunicacaoPush implements IComunicacaoPush {
    constructor(public id?: number, public titulo?: string, public conteudoPush?: string, public tipoPessoa?: TipoPessoa) {}
}
