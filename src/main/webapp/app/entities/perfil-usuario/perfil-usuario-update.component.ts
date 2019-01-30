import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IPerfilUsuario } from 'app/shared/model/perfil-usuario.model';
import { PerfilUsuarioService } from './perfil-usuario.service';

@Component({
    selector: 'jhi-perfil-usuario-update',
    templateUrl: './perfil-usuario-update.component.html'
})
export class PerfilUsuarioUpdateComponent implements OnInit {
    perfilUsuario: IPerfilUsuario;
    isSaving: boolean;

    constructor(private perfilUsuarioService: PerfilUsuarioService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ perfilUsuario }) => {
            this.perfilUsuario = perfilUsuario;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.perfilUsuario.id !== undefined) {
            this.subscribeToSaveResponse(this.perfilUsuarioService.update(this.perfilUsuario));
        } else {
            this.subscribeToSaveResponse(this.perfilUsuarioService.create(this.perfilUsuario));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPerfilUsuario>>) {
        result.subscribe((res: HttpResponse<IPerfilUsuario>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
