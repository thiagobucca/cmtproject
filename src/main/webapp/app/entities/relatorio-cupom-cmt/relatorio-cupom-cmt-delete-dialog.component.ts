import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRelatorioCupomCmt } from 'app/shared/model/relatorio-cupom-cmt.model';
import { RelatorioCupomCmtService } from './relatorio-cupom-cmt.service';

@Component({
    selector: 'jhi-relatorio-cupom-cmt-delete-dialog',
    templateUrl: './relatorio-cupom-cmt-delete-dialog.component.html'
})
export class RelatorioCupomCmtDeleteDialogComponent {
    relatorioCupomCmt: IRelatorioCupomCmt;

    constructor(
        private relatorioCupomCmtService: RelatorioCupomCmtService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.relatorioCupomCmtService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'relatorioCupomCmtListModification',
                content: 'Deleted an relatorioCupomCmt'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-relatorio-cupom-cmt-delete-popup',
    template: ''
})
export class RelatorioCupomCmtDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ relatorioCupomCmt }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RelatorioCupomCmtDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.relatorioCupomCmt = relatorioCupomCmt;
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
