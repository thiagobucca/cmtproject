import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILojaMaconica } from 'app/shared/model/loja-maconica.model';
import { LojaMaconicaService } from './loja-maconica.service';

@Component({
    selector: 'jhi-loja-maconica-delete-dialog',
    templateUrl: './loja-maconica-delete-dialog.component.html'
})
export class LojaMaconicaDeleteDialogComponent {
    lojaMaconica: ILojaMaconica;

    constructor(
        private lojaMaconicaService: LojaMaconicaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.lojaMaconicaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'lojaMaconicaListModification',
                content: 'Deleted an lojaMaconica'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-loja-maconica-delete-popup',
    template: ''
})
export class LojaMaconicaDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ lojaMaconica }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(LojaMaconicaDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.lojaMaconica = lojaMaconica;
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
