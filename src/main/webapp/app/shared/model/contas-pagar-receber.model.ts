import { Moment } from 'moment';

export const enum StatusLancamento {
    Aberto = 'Aberto',
    Baixado = 'Baixado'
}

export interface IContasPagarReceber {
    id?: number;
    data?: Moment;
    valor?: number;
    statusLancamento?: StatusLancamento;
    usuarioId?: number;
    lojaMaconicaId?: number;
    estabelecimentoComercialId?: number;
    tipoOperacaoId?: number;
}

export class ContasPagarReceber implements IContasPagarReceber {
    constructor(
        public id?: number,
        public data?: Moment,
        public valor?: number,
        public statusLancamento?: StatusLancamento,
        public usuarioId?: number,
        public lojaMaconicaId?: number,
        public estabelecimentoComercialId?: number,
        public tipoOperacaoId?: number
    ) {}
}
