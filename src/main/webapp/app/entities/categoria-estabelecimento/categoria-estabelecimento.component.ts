import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICategoriaEstabelecimento } from 'app/shared/model/categoria-estabelecimento.model';
import { Principal } from 'app/core';
import { CategoriaEstabelecimentoService } from './categoria-estabelecimento.service';

@Component({
    selector: 'jhi-categoria-estabelecimento',
    templateUrl: './categoria-estabelecimento.component.html'
})
export class CategoriaEstabelecimentoComponent implements OnInit, OnDestroy {
    categoriaEstabelecimentos: ICategoriaEstabelecimento[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private categoriaEstabelecimentoService: CategoriaEstabelecimentoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.categoriaEstabelecimentoService.query().subscribe(
            (res: HttpResponse<ICategoriaEstabelecimento[]>) => {
                this.categoriaEstabelecimentos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCategoriaEstabelecimentos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICategoriaEstabelecimento) {
        return item.id;
    }

    registerChangeInCategoriaEstabelecimentos() {
        this.eventSubscriber = this.eventManager.subscribe('categoriaEstabelecimentoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
