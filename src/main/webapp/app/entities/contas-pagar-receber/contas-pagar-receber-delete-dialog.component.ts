import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IContasPagarReceber } from 'app/shared/model/contas-pagar-receber.model';
import { ContasPagarReceberService } from './contas-pagar-receber.service';

@Component({
    selector: 'jhi-contas-pagar-receber-delete-dialog',
    templateUrl: './contas-pagar-receber-delete-dialog.component.html'
})
export class ContasPagarReceberDeleteDialogComponent {
    contasPagarReceber: IContasPagarReceber;

    constructor(
        private contasPagarReceberService: ContasPagarReceberService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.contasPagarReceberService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'contasPagarReceberListModification',
                content: 'Deleted an contasPagarReceber'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-contas-pagar-receber-delete-popup',
    template: ''
})
export class ContasPagarReceberDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ contasPagarReceber }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ContasPagarReceberDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.contasPagarReceber = contasPagarReceber;
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
