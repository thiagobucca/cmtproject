import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { ICupom } from 'app/shared/model/cupom.model';
import { Principal } from 'app/core';
import { CupomService } from './cupom.service';

@Component({
    selector: 'jhi-cupom',
    templateUrl: './cupom.component.html'
})
export class CupomComponent implements OnInit, OnDestroy {
    cupoms: ICupom[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cupomService: CupomService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.cupomService.query().subscribe(
            (res: HttpResponse<ICupom[]>) => {
                this.cupoms = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCupoms();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICupom) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    registerChangeInCupoms() {
        this.eventSubscriber = this.eventManager.subscribe('cupomListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
