import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPerfilUsuario } from 'app/shared/model/perfil-usuario.model';
import { Principal } from 'app/core';
import { PerfilUsuarioService } from './perfil-usuario.service';

@Component({
    selector: 'jhi-perfil-usuario',
    templateUrl: './perfil-usuario.component.html'
})
export class PerfilUsuarioComponent implements OnInit, OnDestroy {
    perfilUsuarios: IPerfilUsuario[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private perfilUsuarioService: PerfilUsuarioService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.perfilUsuarioService.query().subscribe(
            (res: HttpResponse<IPerfilUsuario[]>) => {
                this.perfilUsuarios = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPerfilUsuarios();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPerfilUsuario) {
        return item.id;
    }

    registerChangeInPerfilUsuarios() {
        this.eventSubscriber = this.eventManager.subscribe('perfilUsuarioListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
