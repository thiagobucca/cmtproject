export interface IRelatorioContasPagarReceber {
    id?: number;
    nome?: string;
}

export class RelatorioContasPagarReceber implements IRelatorioContasPagarReceber {
    constructor(public id?: number, public nome?: string) {}
}
