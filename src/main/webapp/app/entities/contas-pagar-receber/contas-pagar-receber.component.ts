import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IContasPagarReceber } from 'app/shared/model/contas-pagar-receber.model';
import { Principal } from 'app/core';
import { ContasPagarReceberService } from './contas-pagar-receber.service';

@Component({
    selector: 'jhi-contas-pagar-receber',
    templateUrl: './contas-pagar-receber.component.html'
})
export class ContasPagarReceberComponent implements OnInit, OnDestroy {
    contasPagarRecebers: IContasPagarReceber[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private contasPagarReceberService: ContasPagarReceberService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.contasPagarReceberService.query().subscribe(
            (res: HttpResponse<IContasPagarReceber[]>) => {
                this.contasPagarRecebers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInContasPagarRecebers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IContasPagarReceber) {
        return item.id;
    }

    registerChangeInContasPagarRecebers() {
        this.eventSubscriber = this.eventManager.subscribe('contasPagarReceberListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
