import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IEstabelecimentoComercial } from 'app/shared/model/estabelecimento-comercial.model';
import { Principal } from 'app/core';
import { EstabelecimentoComercialService } from './estabelecimento-comercial.service';

@Component({
    selector: 'jhi-estabelecimento-comercial',
    templateUrl: './estabelecimento-comercial.component.html'
})
export class EstabelecimentoComercialComponent implements OnInit, OnDestroy {
    estabelecimentoComercials: IEstabelecimentoComercial[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private estabelecimentoComercialService: EstabelecimentoComercialService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.estabelecimentoComercialService.query().subscribe(
            (res: HttpResponse<IEstabelecimentoComercial[]>) => {
                this.estabelecimentoComercials = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInEstabelecimentoComercials();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEstabelecimentoComercial) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    registerChangeInEstabelecimentoComercials() {
        this.eventSubscriber = this.eventManager.subscribe('estabelecimentoComercialListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
