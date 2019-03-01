import { Moment } from 'moment';

export interface IRelatorioCupomCmt {
    id?: number;
    numero?: string;
    data?: Moment;
    valor?: Number;
    foto?: string;
    fotoContentType?: string;
    estabelecimentoComercialId?: number;
    usuarioId?: number;
    estabelecimento?: string;
    usuario?: string;
    valorCMT?: number;
    valorLoja?: number;
    taxaConvenio?: number;
}

export class RelatorioCupomCmt implements IRelatorioCupomCmt {
    constructor(public id?: number, public numero?: string, public data?: Moment) {}
}
