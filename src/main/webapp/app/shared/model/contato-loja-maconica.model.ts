export interface IContatoLojaMaconica {
    id?: number;
    nome?: string;
    telefone?: string;
    email?: string;
    lojaMaconicaId?: number;
}

export class ContatoLojaMaconica implements IContatoLojaMaconica {
    constructor(
        public id?: number,
        public nome?: string,
        public telefone?: string,
        public email?: string,
        public lojaMaconicaId?: number
    ) {}
}
