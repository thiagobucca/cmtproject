import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRelatorioContasPagarReceber } from 'app/shared/model/relatorio-contas-pagar-receber.model';
import { RelatorioContasPagarReceberService } from './relatorio-contas-pagar-receber.service';

@Component({
    selector: 'jhi-relatorio-contas-pagar-receber-delete-dialog',
    templateUrl: './relatorio-contas-pagar-receber-delete-dialog.component.html'
})
export class RelatorioContasPagarReceberDeleteDialogComponent {
    relatorioContasPagarReceber: IRelatorioContasPagarReceber;

    constructor(
        private relatorioContasPagarReceberService: RelatorioContasPagarReceberService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.relatorioContasPagarReceberService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'relatorioContasPagarReceberListModification',
                content: 'Deleted an relatorioContasPagarReceber'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-relatorio-contas-pagar-receber-delete-popup',
    template: ''
})
export class RelatorioContasPagarReceberDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ relatorioContasPagarReceber }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RelatorioContasPagarReceberDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.relatorioContasPagarReceber = relatorioContasPagarReceber;
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
