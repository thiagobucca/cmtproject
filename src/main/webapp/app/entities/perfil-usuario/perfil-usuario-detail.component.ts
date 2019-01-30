import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPerfilUsuario } from 'app/shared/model/perfil-usuario.model';

@Component({
    selector: 'jhi-perfil-usuario-detail',
    templateUrl: './perfil-usuario-detail.component.html'
})
export class PerfilUsuarioDetailComponent implements OnInit {
    perfilUsuario: IPerfilUsuario;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ perfilUsuario }) => {
            this.perfilUsuario = perfilUsuario;
        });
    }

    previousState() {
        window.history.back();
    }
}
