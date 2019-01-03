import { IPerfilUsuario } from 'app/shared/model//perfil-usuario.model';

export interface IUsuario {
    id?: number;
    nome?: string;
    telefone?: string;
    email?: string;
    senha?: string;
    bolAtivo?: boolean;
    perfil?: IPerfilUsuario;
}

export class Usuario implements IUsuario {
    constructor(
        public id?: number,
        public nome?: string,
        public telefone?: string,
        public email?: string,
        public senha?: string,
        public bolAtivo?: boolean,
        public perfil?: IPerfilUsuario
    ) {
        this.bolAtivo = this.bolAtivo || false;
    }
}
