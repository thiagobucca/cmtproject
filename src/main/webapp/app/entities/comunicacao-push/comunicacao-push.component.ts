import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IComunicacaoPush } from 'app/shared/model/comunicacao-push.model';
import { Principal } from 'app/core';
import { ComunicacaoPushService } from './comunicacao-push.service';

@Component({
    selector: 'jhi-comunicacao-push',
    templateUrl: './comunicacao-push.component.html'
})
export class ComunicacaoPushComponent implements OnInit, OnDestroy {
    comunicacaoPushes: IComunicacaoPush[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private comunicacaoPushService: ComunicacaoPushService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.comunicacaoPushService.query().subscribe(
            (res: HttpResponse<IComunicacaoPush[]>) => {
                this.comunicacaoPushes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInComunicacaoPushes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IComunicacaoPush) {
        return item.id;
    }

    registerChangeInComunicacaoPushes() {
        this.eventSubscriber = this.eventManager.subscribe('comunicacaoPushListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
