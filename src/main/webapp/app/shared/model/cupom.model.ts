import { Moment } from 'moment';
import { IEstabelecimentoComercial } from 'app/shared/model//estabelecimento-comercial.model';

export interface ICupom {
    id?: number;
    data?: Moment;
    valor?: number;
    numero?: string;
    fotoContentType?: string;
    foto?: any;
    estabelecimentoComercial?: IEstabelecimentoComercial;
}

export class Cupom implements ICupom {
    constructor(
        public id?: number,
        public data?: Moment,
        public valor?: number,
        public numero?: string,
        public fotoContentType?: string,
        public foto?: any,
        public estabelecimentoComercial?: IEstabelecimentoComercial
    ) {}
}
