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
    categoriaEstabelecimentoId?: number;
    categoria?: string;
    estabelecimentoMatrizId?: number;
    matriz?: string;
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
        public categoriaEstabelecimentoId?: number,
        public estabelecimentoMatrizId?: number,
        public categoria?: string,
        public matriz?: string
    ) {
        this.bolMatriz = this.bolMatriz || false;
        this.bolAtivo = this.bolAtivo || false;
    }
}
