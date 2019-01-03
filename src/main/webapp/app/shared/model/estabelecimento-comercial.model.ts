import { ICategoriaEstabelecimento } from 'app/shared/model//categoria-estabelecimento.model';
import { IContatoEstabelecimento } from 'app/shared/model//contato-estabelecimento.model';
import { IEstabelecimentoComercial } from 'app/shared/model//estabelecimento-comercial.model';

export interface IEstabelecimentoComercial {
    id?: number;
    bolMatriz?: boolean;
    codCnpj?: string;
    nome?: string;
    endereco?: string;
    telefone?: string;
    logoContentType?: string;
    logo?: any;
    taxaConvenio?: number;
    bolAtivo?: boolean;
    categoria?: ICategoriaEstabelecimento;
    contatoes?: IContatoEstabelecimento[];
    matriz?: IEstabelecimentoComercial;
}

export class EstabelecimentoComercial implements IEstabelecimentoComercial {
    constructor(
        public id?: number,
        public bolMatriz?: boolean,
        public codCnpj?: string,
        public nome?: string,
        public endereco?: string,
        public telefone?: string,
        public logoContentType?: string,
        public logo?: any,
        public taxaConvenio?: number,
        public bolAtivo?: boolean,
        public categoria?: ICategoriaEstabelecimento,
        public contatoes?: IContatoEstabelecimento[],
        public matriz?: IEstabelecimentoComercial
    ) {
        this.bolMatriz = this.bolMatriz || false;
        this.bolAtivo = this.bolAtivo || false;
    }
}
