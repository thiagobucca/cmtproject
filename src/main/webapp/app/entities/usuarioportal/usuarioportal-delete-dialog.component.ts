import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUsuarioportal } from 'app/shared/model/usuarioportal.model';
import { UsuarioportalService } from './usuarioportal.service';

@Component({
    selector: 'jhi-usuarioportal-delete-dialog',
    templateUrl: './usuarioportal-delete-dialog.component.html'
})
export class UsuarioportalDeleteDialogComponent {
    usuarioportal: IUsuarioportal;

    constructor(
        private usuarioportalService: UsuarioportalService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.usuarioportalService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'usuarioportalListModification',
                content: 'Deleted an usuarioportal'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-usuarioportal-delete-popup',
    template: ''
})
export class UsuarioportalDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ usuarioportal }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(UsuarioportalDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.usuarioportal = usuarioportal;
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
