import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRelatoriocupomxcmt } from 'app/shared/model/relatoriocupomxcmt.model';
import { RelatoriocupomxcmtService } from './relatoriocupomxcmt.service';

@Component({
    selector: 'jhi-relatoriocupomxcmt-delete-dialog',
    templateUrl: './relatoriocupomxcmt-delete-dialog.component.html'
})
export class RelatoriocupomxcmtDeleteDialogComponent {
    relatoriocupomxcmt: IRelatoriocupomxcmt;

    constructor(
        private relatoriocupomxcmtService: RelatoriocupomxcmtService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.relatoriocupomxcmtService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'relatoriocupomxcmtListModification',
                content: 'Deleted an relatoriocupomxcmt'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-relatoriocupomxcmt-delete-popup',
    template: ''
})
export class RelatoriocupomxcmtDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ relatoriocupomxcmt }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RelatoriocupomxcmtDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.relatoriocupomxcmt = relatoriocupomxcmt;
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
