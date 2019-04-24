import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { IComunicacaoPushLoja } from 'app/shared/model/comunicacao-push-loja.model';
import { ComunicacaoPushLojaService } from 'app/entities/comunicacao-push-loja';
import { JhiAlertService } from 'ng-jhipster';
import { IComunicacaoPush } from 'app/shared/model/comunicacao-push.model';
import { AuxiliarService } from 'app/shared/services/auxiliar.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'jhi-comunicacao-push-detail',
    templateUrl: './comunicacao-push-detail.component.html'
})
export class ComunicacaoPushDetailComponent implements OnInit {
    comunicacaoPush: IComunicacaoPush;
    pushLoja: IComunicacaoPushLoja[];
    constructor(
        private activatedRoute: ActivatedRoute,
        private comunicacaoPushLojaService: ComunicacaoPushLojaService,
        private jhiAlertService: JhiAlertService,
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
        this.activatedRoute.data.subscribe(({ comunicacaoPush }) => {
            this.comunicacaoPush = comunicacaoPush;
            this.comunicacaoPushLojaService.findByIdPush(this.comunicacaoPush.id).subscribe(
                (res: HttpResponse<IComunicacaoPushLoja[]>) => {
                    this.pushLoja = res.body;
                    this.loading = false;
                    this.ref.detectChanges();
                },
                (res: HttpErrorResponse) => {
                    this.onError(res.message);
                    this.loading = false;
                    this.ref.detectChanges();
                }
            );
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
