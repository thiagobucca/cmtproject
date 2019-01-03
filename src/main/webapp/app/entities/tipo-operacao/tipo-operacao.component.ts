import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITipoOperacao } from 'app/shared/model/tipo-operacao.model';
import { Principal } from 'app/core';
import { TipoOperacaoService } from './tipo-operacao.service';

@Component({
    selector: 'jhi-tipo-operacao',
    templateUrl: './tipo-operacao.component.html'
})
export class TipoOperacaoComponent implements OnInit, OnDestroy {
    tipoOperacaos: ITipoOperacao[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tipoOperacaoService: TipoOperacaoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.tipoOperacaoService.query().subscribe(
            (res: HttpResponse<ITipoOperacao[]>) => {
                this.tipoOperacaos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTipoOperacaos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITipoOperacao) {
        return item.id;
    }

    registerChangeInTipoOperacaos() {
        this.eventSubscriber = this.eventManager.subscribe('tipoOperacaoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
