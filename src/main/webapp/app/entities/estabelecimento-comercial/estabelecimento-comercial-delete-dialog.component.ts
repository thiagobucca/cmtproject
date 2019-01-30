import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEstabelecimentoComercial } from 'app/shared/model/estabelecimento-comercial.model';
import { EstabelecimentoComercialService } from './estabelecimento-comercial.service';

@Component({
    selector: 'jhi-estabelecimento-comercial-delete-dialog',
    templateUrl: './estabelecimento-comercial-delete-dialog.component.html'
})
export class EstabelecimentoComercialDeleteDialogComponent {
    estabelecimentoComercial: IEstabelecimentoComercial;

    constructor(
        private estabelecimentoComercialService: EstabelecimentoComercialService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.estabelecimentoComercialService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'estabelecimentoComercialListModification',
                content: 'Deleted an estabelecimentoComercial'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-estabelecimento-comercial-delete-popup',
    template: ''
})
export class EstabelecimentoComercialDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ estabelecimentoComercial }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EstabelecimentoComercialDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.estabelecimentoComercial = estabelecimentoComercial;
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
