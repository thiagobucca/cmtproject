export interface IComunicacaoPushLoja {
    id?: number;
    comunicacaoPushId?: number;
    lojaMaconicaId?: number;
}

export class ComunicacaoPushLoja implements IComunicacaoPushLoja {
    constructor(public id?: number, public comunicacaoPushId?: number, public lojaMaconicaId?: number) {}
}
