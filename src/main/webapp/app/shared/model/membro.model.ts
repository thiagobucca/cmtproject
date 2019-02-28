export interface IMembro {
    id?: number;
    nome?: string;
}

export class Membro implements IMembro {
    constructor(public id?: number, public nome?: string) {}
}
