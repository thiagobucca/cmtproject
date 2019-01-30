import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IContatoLojaMaconica } from 'app/shared/model/contato-loja-maconica.model';
import { ContatoLojaMaconicaService } from './contato-loja-maconica.service';

@Component({
    selector: 'jhi-contato-loja-maconica-delete-dialog',
    templateUrl: './contato-loja-maconica-delete-dialog.component.html'
})
export class ContatoLojaMaconicaDeleteDialogComponent {
    contatoLojaMaconica: IContatoLojaMaconica;

    constructor(
        private contatoLojaMaconicaService: ContatoLojaMaconicaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.contatoLojaMaconicaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'contatoLojaMaconicaListModification',
                content: 'Deleted an contatoLojaMaconica'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-contato-loja-maconica-delete-popup',
    template: ''
})
export class ContatoLojaMaconicaDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ contatoLojaMaconica }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ContatoLojaMaconicaDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.contatoLojaMaconica = contatoLojaMaconica;
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
