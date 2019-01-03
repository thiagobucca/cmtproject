import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ILojaMaconica } from 'app/shared/model/loja-maconica.model';
import { Principal } from 'app/core';
import { LojaMaconicaService } from './loja-maconica.service';

@Component({
    selector: 'jhi-loja-maconica',
    templateUrl: './loja-maconica.component.html'
})
export class LojaMaconicaComponent implements OnInit, OnDestroy {
    lojaMaconicas: ILojaMaconica[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private lojaMaconicaService: LojaMaconicaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.lojaMaconicaService.query().subscribe(
            (res: HttpResponse<ILojaMaconica[]>) => {
                this.lojaMaconicas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInLojaMaconicas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ILojaMaconica) {
        return item.id;
    }

    registerChangeInLojaMaconicas() {
        this.eventSubscriber = this.eventManager.subscribe('lojaMaconicaListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
