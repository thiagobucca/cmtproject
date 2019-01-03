import { Moment } from 'moment';
import { IUsuario } from 'app/shared/model//usuario.model';
import { ILojaMaconica } from 'app/shared/model//loja-maconica.model';
import { IEstabelecimentoComercial } from 'app/shared/model//estabelecimento-comercial.model';
import { ITipoOperacao } from 'app/shared/model//tipo-operacao.model';

export const enum TipoLancamento {
    Credito = 'Credito',
    Debito = 'Debito'
}

export const enum StatusLancamento {
    Aberto = 'Aberto',
    Baixado = 'Baixado'
}

export interface IContasPagarReceber {
    id?: number;
    data?: Moment;
    valor?: number;
    tipoLancamento?: TipoLancamento;
    statusLancamento?: StatusLancamento;
    usuario?: IUsuario;
    lojaMaconica?: ILojaMaconica;
    estabelecimentoComercial?: IEstabelecimentoComercial;
    tipoOperacao?: ITipoOperacao;
}

export class ContasPagarReceber implements IContasPagarReceber {
    constructor(
        public id?: number,
        public data?: Moment,
        public valor?: number,
        public tipoLancamento?: TipoLancamento,
        public statusLancamento?: StatusLancamento,
        public usuario?: IUsuario,
        public lojaMaconica?: ILojaMaconica,
        public estabelecimentoComercial?: IEstabelecimentoComercial,
        public tipoOperacao?: ITipoOperacao
    ) {}
}
