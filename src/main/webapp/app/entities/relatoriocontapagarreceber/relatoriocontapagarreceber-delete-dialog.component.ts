import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRelatoriocontapagarreceber } from 'app/shared/model/relatoriocontapagarreceber.model';
import { RelatoriocontapagarreceberService } from './relatoriocontapagarreceber.service';

@Component({
    selector: 'jhi-relatoriocontapagarreceber-delete-dialog',
    templateUrl: './relatoriocontapagarreceber-delete-dialog.component.html'
})
export class RelatoriocontapagarreceberDeleteDialogComponent {
    relatoriocontapagarreceber: IRelatoriocontapagarreceber;

    constructor(
        private relatoriocontapagarreceberService: RelatoriocontapagarreceberService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.relatoriocontapagarreceberService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'relatoriocontapagarreceberListModification',
                content: 'Deleted an relatoriocontapagarreceber'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-relatoriocontapagarreceber-delete-popup',
    template: ''
})
export class RelatoriocontapagarreceberDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ relatoriocontapagarreceber }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RelatoriocontapagarreceberDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.relatoriocontapagarreceber = relatoriocontapagarreceber;
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
