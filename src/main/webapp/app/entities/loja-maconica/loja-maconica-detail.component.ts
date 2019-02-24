import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { ILojaMaconica } from 'app/shared/model/loja-maconica.model';
import { IContatoLojaMaconica, ContatoLojaMaconica } from 'app/shared/model/contato-loja-maconica.model';
import { ContatoLojaMaconicaService } from 'app/entities/contato-loja-maconica/contato-loja-maconica.service';
import { JhiAlertService } from 'ng-jhipster';

import { AuxiliarService } from 'app/shared/services/auxiliar.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'jhi-loja-maconica-detail',
    templateUrl: './loja-maconica-detail.component.html'
})
export class LojaMaconicaDetailComponent implements OnInit {
    lojaMaconica: ILojaMaconica;
    contatolojas: IContatoLojaMaconica[];
    constructor(
        private activatedRoute: ActivatedRoute,
        private jhiAlertService: JhiAlertService,
        private contatoLojaMaconicaService: ContatoLojaMaconicaService,
        private auxService: AuxiliarService,
        private ref: ChangeDetectorRef
    ) {}
    get loading(): boolean {
        return this.auxService.isLoading;
    }
    set loading(status: boolean) {
        this.auxService.isLoading = status;
    }
    ngOnInit() {
        this.loading = true;
        this.activatedRoute.data.subscribe(({ lojaMaconica }) => {
            this.lojaMaconica = lojaMaconica;
            this.loading = false;
            this.ref.detectChanges();
            if (this.lojaMaconica.id !== undefined) {
                this.loading = true;
                this.contatoLojaMaconicaService.findByLoja(this.lojaMaconica.id).subscribe(
                    (res: HttpResponse<IContatoLojaMaconica[]>) => {
                        this.contatolojas = res.body;
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
        });
    }

    previousState() {
        window.history.back();
    }
    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
    trackById(index: number, item: any) {
        return item.id;
    }
}
