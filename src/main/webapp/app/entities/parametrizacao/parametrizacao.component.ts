import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ActivatedRoute, Router } from '@angular/router';
import { IParametrizacao } from 'app/shared/model/parametrizacao.model';
import { Principal } from 'app/core';
import { ParametrizacaoService } from './parametrizacao.service';
import { AuxiliarService } from 'app/shared/services/auxiliar.service';
import { ChangeDetectorRef } from '@angular/core';

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
        private principal: Principal,
        private router: Router,
        private auxService: AuxiliarService,
        private ref: ChangeDetectorRef
    ) {}
    get loading(): boolean {
        return this.auxService.isLoading;
    }
    set loading(status: boolean) {
        this.auxService.isLoading = status;
    }
    loadAll() {
        this.loading = true;
        this.parametrizacaoService.query().subscribe(
            (res: HttpResponse<IParametrizacao[]>) => {
                this.parametrizacaos = res.body;
                this.loading = false;
                this.ref.detectChanges();
            },
            (res: HttpErrorResponse) => {
                this.onError(res.message);
                this.loading = false;
                this.ref.detectChanges();
            }
        );
    }
    detalhar(parametros: []) {
        this.loading = true;
        this.router.navigate(parametros);
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
