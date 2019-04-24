import { Moment } from 'moment';

export const enum StatusCupom {
    Ativo = 'Ativo',
    Inativo = 'Inativo',
    Pendente = 'Pendente'
}
export interface ICupom {
    id?: number;
    data?: Moment;
    valor?: number;
    numero?: string;
    fotoContentType?: string;
    foto?: any;
    estabelecimentoComercialId?: number;
    estabelecimento?: string;
    usuarioId?: number;
    usuario?: string;
    statusCupom?: StatusCupom;
}

export class Cupom implements ICupom {
    constructor(
        public id?: number,
        public data?: Moment,
        public valor?: number,
        public numero?: string,
        public fotoContentType?: string,
        public foto?: any,
        public estabelecimentoComercialId?: number,
        public estabelecimento?: string,
        public usuarioId?: number,
        public usuario?: string,
        public statusCupom?: StatusCupom
    ) {
        this.statusCupom = statusCupom ? statusCupom : <StatusCupom>'Pendente';
    }
}
