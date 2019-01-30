import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IParametrizacao } from 'app/shared/model/parametrizacao.model';
import { Principal } from 'app/core';
import { ParametrizacaoService } from './parametrizacao.service';

@Component({
    selector: 'jhi-parametrizacao',
    templateUrl: './parametrizacao.component.html'
})
export class ParametrizacaoComponent implements OnInit, OnDestroy {
    parametrizacaos: IParametrizacao[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private parametrizacaoService: ParametrizacaoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.parametrizacaoService.query().subscribe(
            (res: HttpResponse<IParametrizacao[]>) => {
                this.parametrizacaos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInParametrizacaos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IParametrizacao) {
        return item.id;
    }

    registerChangeInParametrizacaos() {
        this.eventSubscriber = this.eventManager.subscribe('parametrizacaoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
