export interface ILojaMaconica {
    id?: number;
    codCnpj?: string;
    nome?: string;
    endereco?: string;
    telefone?: string;
    numero?: number;
    bolAtivo?: boolean;
}

export class LojaMaconica implements ILojaMaconica {
    constructor(
        public id?: number,
        public codCnpj?: string,
        public nome?: string,
        public endereco?: string,
        public telefone?: string,
        public numero?: number,
        public bolAtivo?: boolean
    ) {
        this.bolAtivo = this.bolAtivo || true;
    }
}
