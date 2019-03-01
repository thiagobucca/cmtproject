import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UsuarioPortal } from 'app/shared/model/usuarioportal.model';
import { AuxiliarService } from 'app/shared/services/auxiliar.service';
import { ChangeDetectorRef } from '@angular/core';
@Component({
    selector: 'jhi-usuarioportal-detail',
    templateUrl: './usuarioportal-detail.component.html'
})
export class UsuarioportalDetailComponent implements OnInit {
    user: UsuarioPortal;

    constructor(private route: ActivatedRoute, private auxService: AuxiliarService, private ref: ChangeDetectorRef) {}

    ngOnInit() {
        this.loading = true;
        this.route.data.subscribe(({ user }) => {
            this.user = user.body ? user.body : user;
            this.loading = false;
            this.ref.detectChanges();
        });
    }
    get loading(): boolean {
        return this.auxService.isLoading;
    }
    set loading(status: boolean) {
        this.auxService.isLoading = status;
    }
}
