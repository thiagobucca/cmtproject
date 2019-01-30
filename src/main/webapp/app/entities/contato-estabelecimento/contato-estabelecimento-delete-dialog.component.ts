import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IContatoEstabelecimento } from 'app/shared/model/contato-estabelecimento.model';
import { ContatoEstabelecimentoService } from './contato-estabelecimento.service';

@Component({
    selector: 'jhi-contato-estabelecimento-delete-dialog',
    templateUrl: './contato-estabelecimento-delete-dialog.component.html'
})
export class ContatoEstabelecimentoDeleteDialogComponent {
    contatoEstabelecimento: IContatoEstabelecimento;

    constructor(
        private contatoEstabelecimentoService: ContatoEstabelecimentoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.contatoEstabelecimentoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'contatoEstabelecimentoListModification',
                content: 'Deleted an contatoEstabelecimento'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-contato-estabelecimento-delete-popup',
    template: ''
})
export class ContatoEstabelecimentoDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ contatoEstabelecimento }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ContatoEstabelecimentoDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.contatoEstabelecimento = contatoEstabelecimento;
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
