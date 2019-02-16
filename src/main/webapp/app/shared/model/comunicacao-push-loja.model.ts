export interface IComunicacaoPushLoja {
    id?: number;
    comunicacaoPushId?: number;
    lojaMaconicaId?: number;
    lojaMaconica?: string;
}

export class ComunicacaoPushLoja implements IComunicacaoPushLoja {
    constructor(public id?: number, public comunicacaoPushId?: number, public lojaMaconicaId?: number, public lojaMaconica?: string) {}
}
