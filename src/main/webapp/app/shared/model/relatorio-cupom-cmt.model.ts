export interface IRelatorioCupomCmt {
    id?: number;
    cupom?: string;
    data?: number;
}

export class RelatorioCupomCmt implements IRelatorioCupomCmt {
    constructor(public id?: number, public cupom?: string, public data?: number) {}
}
