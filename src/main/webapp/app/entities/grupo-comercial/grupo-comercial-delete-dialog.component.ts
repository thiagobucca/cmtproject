import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGrupoComercial } from 'app/shared/model/grupo-comercial.model';
import { GrupoComercialService } from './grupo-comercial.service';

@Component({
    selector: 'jhi-grupo-comercial-delete-dialog',
    templateUrl: './grupo-comercial-delete-dialog.component.html'
})
export class GrupoComercialDeleteDialogComponent {
    grupoComercial: IGrupoComercial;

    constructor(
        private grupoComercialService: GrupoComercialService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.grupoComercialService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'grupoComercialListModification',
                content: 'Deleted an grupoComercial'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-grupo-comercial-delete-popup',
    template: ''
})
export class GrupoComercialDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ grupoComercial }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(GrupoComercialDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.grupoComercial = grupoComercial;
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
