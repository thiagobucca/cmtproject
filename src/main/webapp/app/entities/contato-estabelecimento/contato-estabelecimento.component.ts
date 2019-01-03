import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IContatoEstabelecimento } from 'app/shared/model/contato-estabelecimento.model';
import { Principal } from 'app/core';
import { ContatoEstabelecimentoService } from './contato-estabelecimento.service';

@Component({
    selector: 'jhi-contato-estabelecimento',
    templateUrl: './contato-estabelecimento.component.html'
})
export class ContatoEstabelecimentoComponent implements OnInit, OnDestroy {
    contatoEstabelecimentos: IContatoEstabelecimento[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private contatoEstabelecimentoService: ContatoEstabelecimentoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.contatoEstabelecimentoService.query().subscribe(
            (res: HttpResponse<IContatoEstabelecimento[]>) => {
                this.contatoEstabelecimentos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInContatoEstabelecimentos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IContatoEstabelecimento) {
        return item.id;
    }

    registerChangeInContatoEstabelecimentos() {
        this.eventSubscriber = this.eventManager.subscribe('contatoEstabelecimentoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
