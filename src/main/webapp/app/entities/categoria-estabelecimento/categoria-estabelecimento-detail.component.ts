import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICategoriaEstabelecimento } from 'app/shared/model/categoria-estabelecimento.model';
import { AuxiliarService } from 'app/shared/services/auxiliar.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'jhi-categoria-estabelecimento-detail',
    templateUrl: './categoria-estabelecimento-detail.component.html'
})
export class CategoriaEstabelecimentoDetailComponent implements OnInit {
    categoriaEstabelecimento: ICategoriaEstabelecimento;

    constructor(private activatedRoute: ActivatedRoute, private auxService: AuxiliarService, private ref: ChangeDetectorRef) {}
    get loading(): boolean {
        return this.auxService.isLoading;
    }
    set loading(status: boolean) {
        this.auxService.isLoading = status;
    }
    ngOnInit() {
        this.loading = true;
        this.activatedRoute.data.subscribe(({ categoriaEstabelecimento }) => {
            this.categoriaEstabelecimento = categoriaEstabelecimento;
            this.loading = false;
            this.ref.detectChanges();
        });
    }

    previousState() {
        window.history.back();
    }
}
