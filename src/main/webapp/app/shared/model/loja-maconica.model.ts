import { IContatoLojaMaconica } from 'app/shared/model//contato-loja-maconica.model';
import { IComunicacaoPush } from 'app/shared/model//comunicacao-push.model';

export interface ILojaMaconica {
    id?: number;
    codCnpj?: string;
    nome?: string;
    endereco?: string;
    telefone?: string;
    numero?: number;
    bolAtivo?: boolean;
    contato?: IContatoLojaMaconica;
    comunicacaoPush?: IComunicacaoPush;
}

export class LojaMaconica implements ILojaMaconica {
    constructor(
        public id?: number,
        public codCnpj?: string,
        public nome?: string,
        public endereco?: string,
        public telefone?: string,
        public numero?: number,
        public bolAtivo?: boolean,
        public contato?: IContatoLojaMaconica,
        public comunicacaoPush?: IComunicacaoPush
    ) {
        this.bolAtivo = this.bolAtivo || false;
    }
}
