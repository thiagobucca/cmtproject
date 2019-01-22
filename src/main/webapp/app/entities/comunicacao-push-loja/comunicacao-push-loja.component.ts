import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IComunicacaoPushLoja } from 'app/shared/model/comunicacao-push-loja.model';
import { Principal } from 'app/core';
import { ComunicacaoPushLojaService } from './comunicacao-push-loja.service';

@Component({
    selector: 'jhi-comunicacao-push-loja',
    templateUrl: './comunicacao-push-loja.component.html'
})
export class ComunicacaoPushLojaComponent implements OnInit, OnDestroy {
    comunicacaoPushLojas: IComunicacaoPushLoja[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private comunicacaoPushLojaService: ComunicacaoPushLojaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.comunicacaoPushLojaService.query().subscribe(
            (res: HttpResponse<IComunicacaoPushLoja[]>) => {
                this.comunicacaoPushLojas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInComunicacaoPushLojas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IComunicacaoPushLoja) {
        return item.id;
    }

    registerChangeInComunicacaoPushLojas() {
        this.eventSubscriber = this.eventManager.subscribe('comunicacaoPushLojaListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
