import { Moment } from 'moment';

export interface IAgendaEventos {
    id?: number;
    titulo?: string;
    data?: Moment;
    local?: string;
    descricao?: string;
    bolAtivo?: boolean;
    lojaMaconicaId?: number;
    lojaMaconica?: string;
}

export class AgendaEventos implements IAgendaEventos {
    constructor(
        public id?: number,
        public titulo?: string,
        public data?: Moment,
        public local?: string,
        public descricao?: string,
        public bolAtivo?: boolean,
        public lojaMaconicaId?: number,
        public lojaMaconica?: string
    ) {
        this.bolAtivo = this.bolAtivo || false;
    }
}
