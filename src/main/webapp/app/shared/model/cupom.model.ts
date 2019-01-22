import { Moment } from 'moment';

export interface ICupom {
    id?: number;
    data?: Moment;
    valor?: number;
    numero?: string;
    fotoContentType?: string;
    foto?: any;
    estabelecimentoComercialId?: number;
}

export class Cupom implements ICupom {
    constructor(
        public id?: number,
        public data?: Moment,
        public valor?: number,
        public numero?: string,
        public fotoContentType?: string,
        public foto?: any,
        public estabelecimentoComercialId?: number
    ) {}
}
