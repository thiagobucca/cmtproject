import { Moment } from 'moment';
import { ILojaMaconica } from 'app/shared/model//loja-maconica.model';

export interface IAgendaEventos {
    id?: number;
    titulo?: string;
    data?: Moment;
    local?: string;
    descricao?: string;
    bolAtivo?: boolean;
    lojaMaconica?: ILojaMaconica;
}

export class AgendaEventos implements IAgendaEventos {
    constructor(
        public id?: number,
        public titulo?: string,
        public data?: Moment,
        public local?: string,
        public descricao?: string,
        public bolAtivo?: boolean,
        public lojaMaconica?: ILojaMaconica
    ) {
        this.bolAtivo = this.bolAtivo || false;
    }
}
