import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { IComunicacaoPushLoja } from 'app/shared/model/comunicacao-push-loja.model';
import { ComunicacaoPushLojaService } from 'app/entities/comunicacao-push-loja';
import { JhiAlertService } from 'ng-jhipster';
import { IComunicacaoPush } from 'app/shared/model/comunicacao-push.model';

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
        private jhiAlertService: JhiAlertService
    ) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ comunicacaoPush }) => {
            this.comunicacaoPush = comunicacaoPush;
            this.comunicacaoPushLojaService.findByIdPush(this.comunicacaoPush.id).subscribe(
                (res: HttpResponse<IComunicacaoPushLoja[]>) => {
                    this.pushLoja = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
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
