import { StatusLancamento } from './contas-pagar-receber.model';
import { Moment } from 'moment';
export interface IRelatorioContasPagarReceber {
    id?: number;
    data?: Moment;
    valor?: number;
    statusLancamento?: StatusLancamento;
    usuarioId?: number;
    lojaMaconicaId?: number;
    estabelecimentoComercialId?: number;
    estabelecimento?: string;
    tipoOperacaoId?: number;
    tipoOperacao?: string;
    lojaMaconica?: string;
    usuario?: string;
    tipoLancamento?: string;
}

export class RelatorioContasPagarReceber implements IRelatorioContasPagarReceber {
    constructor(public id?: number, public nome?: string) {}
}
