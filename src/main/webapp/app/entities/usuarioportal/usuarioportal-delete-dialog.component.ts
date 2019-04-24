import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { ActivatedRoute, Router } from '@angular/router';

import { User, UserService } from 'app/core';
import { UsuarioportalService } from './usuarioportal.service';

@Component({
    selector: 'jhi-usuarioportal-delete-dialog',
    templateUrl: './usuarioportal-delete-dialog.component.html'
})
export class UsuarioportalDeleteDialogComponent {
    user: User;

    constructor(private userService: UsuarioportalService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(login) {
        this.userService.delete(login).subscribe(response => {
            this.eventManager.broadcast({
                name: 'userListModification',
                content: 'Deleted a user'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tipo-operacao-delete-popup',
    template: ''
})
export class UsuarioportalDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tipoOperacao }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(UsuarioportalDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.tipoOperacao = tipoOperacao;
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
