import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoOperacao } from 'app/shared/model/tipo-operacao.model';

import { AuxiliarService } from 'app/shared/services/auxiliar.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'jhi-tipo-operacao-detail',
    templateUrl: './tipo-operacao-detail.component.html'
})
export class TipoOperacaoDetailComponent implements OnInit {
    tipoOperacao: ITipoOperacao;

    constructor(private activatedRoute: ActivatedRoute, private auxService: AuxiliarService, private ref: ChangeDetectorRef) {}
    get loading(): boolean {
        return this.auxService.isLoading;
    }
    set loading(status: boolean) {
        this.auxService.isLoading = status;
    }
    ngOnInit() {
        this.loading = true;
        this.activatedRoute.data.subscribe(({ tipoOperacao }) => {
            this.tipoOperacao = tipoOperacao;
            this.loading = false;
            this.ref.detectChanges();
        });
    }

    previousState() {
        window.history.back();
    }
}
