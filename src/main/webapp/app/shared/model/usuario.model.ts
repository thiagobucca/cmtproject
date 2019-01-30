export interface IUsuario {
    id?: number;
    nome?: string;
    telefone?: string;
    email?: string;
    senha?: string;
    bolAtivo?: boolean;
    perfilId?: number;
}

export class Usuario implements IUsuario {
    constructor(
        public id?: number,
        public nome?: string,
        public telefone?: string,
        public email?: string,
        public senha?: string,
        public bolAtivo?: boolean,
        public perfilId?: number
    ) {
        this.bolAtivo = this.bolAtivo || false;
    }
}
