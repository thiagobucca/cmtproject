import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IComunicacaoPushLoja } from 'app/shared/model/comunicacao-push-loja.model';
import { ComunicacaoPushLojaService } from './comunicacao-push-loja.service';

@Component({
    selector: 'jhi-comunicacao-push-loja-delete-dialog',
    templateUrl: './comunicacao-push-loja-delete-dialog.component.html'
})
export class ComunicacaoPushLojaDeleteDialogComponent {
    comunicacaoPushLoja: IComunicacaoPushLoja;

    constructor(
        private comunicacaoPushLojaService: ComunicacaoPushLojaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.comunicacaoPushLojaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'comunicacaoPushLojaListModification',
                content: 'Deleted an comunicacaoPushLoja'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-comunicacao-push-loja-delete-popup',
    template: ''
})
export class ComunicacaoPushLojaDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ comunicacaoPushLoja }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ComunicacaoPushLojaDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.comunicacaoPushLoja = comunicacaoPushLoja;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
