import { TipoPessoa } from 'app/shared/model/comunicacao-push.model';
import { Moment } from 'moment';

export interface IUser {
    id?: any;
    login?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    activated?: boolean;
    langKey?: string;
    authorities?: any[];
    createdBy?: string;
    createdDate?: Date;
    lastModifiedBy?: string;
    lastModifiedDate?: Date;
    password?: string;
    dataNascimento?: Moment;
    lojaMaconicaId?: number;
    pessoaDependenteId?: number;
    telefone?: string;
    tipoPessoa?: TipoPessoa;
}

export class User implements IUser {
    constructor(
        public id?: any,
        public login?: string,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public activated?: boolean,
        public langKey?: string,
        public authorities?: any[],
        public createdBy?: string,
        public createdDate?: Date,
        public lastModifiedBy?: string,
        public lastModifiedDate?: Date,
        public password?: string,
        public dataNascimento?: Moment,
        public lojaMaconicaId?: number,
        public pessoaDependenteId?: number,
        public telefone?: string,
        public tipoPessoa?: TipoPessoa
    ) {
        this.id = id ? id : null;
        this.login = login ? login : null;
        this.firstName = firstName ? firstName : null;
        this.lastName = lastName ? lastName : null;
        this.email = email ? email : null;
        this.activated = activated ? activated : false;
        this.langKey = langKey ? langKey : null;
        this.authorities = authorities ? authorities : null;
        this.createdBy = createdBy ? createdBy : null;
        this.createdDate = createdDate ? createdDate : null;
        this.lastModifiedBy = lastModifiedBy ? lastModifiedBy : null;
        this.lastModifiedDate = lastModifiedDate ? lastModifiedDate : null;
        this.password = password ? password : null;

        this.dataNascimento = dataNascimento ? dataNascimento : null;
        this.lojaMaconicaId = lojaMaconicaId ? lojaMaconicaId : null;
        this.pessoaDependenteId = pessoaDependenteId ? pessoaDependenteId : null;
        this.telefone = telefone ? telefone : null;
        this.tipoPessoa = tipoPessoa ? tipoPessoa : null;
    }
}
