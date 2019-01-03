import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IUsuario } from 'app/shared/model/usuario.model';
import { UsuarioService } from './usuario.service';
import { IPerfilUsuario } from 'app/shared/model/perfil-usuario.model';
import { PerfilUsuarioService } from 'app/entities/perfil-usuario';

@Component({
    selector: 'jhi-usuario-update',
    templateUrl: './usuario-update.component.html'
})
export class UsuarioUpdateComponent implements OnInit {
    usuario: IUsuario;
    isSaving: boolean;

    perfils: IPerfilUsuario[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private usuarioService: UsuarioService,
        private perfilUsuarioService: PerfilUsuarioService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ usuario }) => {
            this.usuario = usuario;
        });
        this.perfilUsuarioService.query({ filter: 'usuario-is-null' }).subscribe(
            (res: HttpResponse<IPerfilUsuario[]>) => {
                if (!this.usuario.perfil || !this.usuario.perfil.id) {
                    this.perfils = res.body;
                } else {
                    this.perfilUsuarioService.find(this.usuario.perfil.id).subscribe(
                        (subRes: HttpResponse<IPerfilUsuario>) => {
                            this.perfils = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.usuario.id !== undefined) {
            this.subscribeToSaveResponse(this.usuarioService.update(this.usuario));
        } else {
            this.subscribeToSaveResponse(this.usuarioService.create(this.usuario));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IUsuario>>) {
        result.subscribe((res: HttpResponse<IUsuario>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackPerfilUsuarioById(index: number, item: IPerfilUsuario) {
        return item.id;
    }
}
