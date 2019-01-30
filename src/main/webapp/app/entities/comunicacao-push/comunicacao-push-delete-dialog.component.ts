import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IComunicacaoPush } from 'app/shared/model/comunicacao-push.model';
import { ComunicacaoPushService } from './comunicacao-push.service';

@Component({
    selector: 'jhi-comunicacao-push-delete-dialog',
    templateUrl: './comunicacao-push-delete-dialog.component.html'
})
export class ComunicacaoPushDeleteDialogComponent {
    comunicacaoPush: IComunicacaoPush;

    constructor(
        private comunicacaoPushService: ComunicacaoPushService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.comunicacaoPushService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'comunicacaoPushListModification',
                content: 'Deleted an comunicacaoPush'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-comunicacao-push-delete-popup',
    template: ''
})
export class ComunicacaoPushDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ comunicacaoPush }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ComunicacaoPushDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.comunicacaoPush = comunicacaoPush;
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
