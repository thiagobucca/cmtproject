export interface IParametrizacao {
    id?: number;
    diaCobrancaConvenio?: number;
    diaPagamentoLoja?: number;
}

export class Parametrizacao implements IParametrizacao {
    constructor(public id?: number, public diaCobrancaConvenio?: number, public diaPagamentoLoja?: number) {}
}
