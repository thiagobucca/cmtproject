import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IContatoLojaMaconica } from 'app/shared/model/contato-loja-maconica.model';
import { Principal } from 'app/core';
import { ContatoLojaMaconicaService } from './contato-loja-maconica.service';

@Component({
    selector: 'jhi-contato-loja-maconica',
    templateUrl: './contato-loja-maconica.component.html'
})
export class ContatoLojaMaconicaComponent implements OnInit, OnDestroy {
    contatoLojaMaconicas: IContatoLojaMaconica[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private contatoLojaMaconicaService: ContatoLojaMaconicaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.contatoLojaMaconicaService.query().subscribe(
            (res: HttpResponse<IContatoLojaMaconica[]>) => {
                this.contatoLojaMaconicas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInContatoLojaMaconicas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IContatoLojaMaconica) {
        return item.id;
    }

    registerChangeInContatoLojaMaconicas() {
        this.eventSubscriber = this.eventManager.subscribe('contatoLojaMaconicaListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
