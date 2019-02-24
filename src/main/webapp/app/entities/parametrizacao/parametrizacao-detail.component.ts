import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IParametrizacao } from 'app/shared/model/parametrizacao.model';
import { AuxiliarService } from 'app/shared/services/auxiliar.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'jhi-parametrizacao-detail',
    templateUrl: './parametrizacao-detail.component.html'
})
export class ParametrizacaoDetailComponent implements OnInit {
    parametrizacao: IParametrizacao;

    constructor(private activatedRoute: ActivatedRoute, private auxService: AuxiliarService, private ref: ChangeDetectorRef) {}
    get loading(): boolean {
        return this.auxService.isLoading;
    }
    set loading(status: boolean) {
        this.auxService.isLoading = status;
    }
    ngOnInit() {
        this.loading = true;
        this.activatedRoute.data.subscribe(({ parametrizacao }) => {
            this.parametrizacao = parametrizacao;
            this.loading = false;
            this.ref.detectChanges();
        });
    }

    previousState() {
        window.history.back();
    }
}
