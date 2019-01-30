export const enum TipoLancamento {
    Credito = 'Credito',
    Debito = 'Debito'
}

export interface ITipoOperacao {
    id?: number;
    nomeOperacao?: string;
    tipoLancamento?: TipoLancamento;
    bolAtivo?: boolean;
}

export class TipoOperacao implements ITipoOperacao {
    constructor(public id?: number, public nomeOperacao?: string, public tipoLancamento?: TipoLancamento, public bolAtivo?: boolean) {
        this.bolAtivo = this.bolAtivo || false;
    }
}
