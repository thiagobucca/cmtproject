import { Moment } from 'moment';

export interface IUsuarioportal {
    id?: number;
    login?: string;
    firstName?: string;
    email?: string;
    activated?: boolean;
    langKey?: string;
    authorities?: string;
    createdBy?: string;
    createdDate?: Moment;
    lastModifiedBy?: string;
    lastModifiedDate?: Moment;
    password?: string;
    dataNascimento?: Moment;
    lojaMaconicaId?: number;
    telefone?: string;
    tipoPessoa?: string;
    placet?: string;
}

export class Usuarioportal implements IUsuarioportal {
    constructor(
        public id?: number,
        public login?: string,
        public firstName?: string,
        public email?: string,
        public activated?: boolean,
        public langKey?: string,
        public authorities?: string,
        public createdBy?: string,
        public createdDate?: Moment,
        public lastModifiedBy?: string,
        public lastModifiedDate?: Moment,
        public password?: string,
        public dataNascimento?: Moment,
        public lojaMaconicaId?: number,
        public telefone?: string,
        public tipoPessoa?: string,
        public placet?: string
    ) {
        this.activated = this.activated || false;
    }
}
