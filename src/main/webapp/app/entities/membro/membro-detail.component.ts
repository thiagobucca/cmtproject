import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMembro, Membro } from 'app/shared/model/membro.model';
import { AuxiliarService } from 'app/shared/services/auxiliar.service';
import { ChangeDetectorRef } from '@angular/core';
@Component({
    selector: 'jhi-membro-detail',
    templateUrl: './membro-detail.component.html'
})
export class MembroDetailComponent implements OnInit {
    user: Membro;

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

    onChangeTipoPessoa(event) {}
}
