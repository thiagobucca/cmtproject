import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICategoriaEstabelecimento } from 'app/shared/model/categoria-estabelecimento.model';
import { CategoriaEstabelecimentoService } from './categoria-estabelecimento.service';

@Component({
    selector: 'jhi-categoria-estabelecimento-delete-dialog',
    templateUrl: './categoria-estabelecimento-delete-dialog.component.html'
})
export class CategoriaEstabelecimentoDeleteDialogComponent {
    categoriaEstabelecimento: ICategoriaEstabelecimento;

    constructor(
        private categoriaEstabelecimentoService: CategoriaEstabelecimentoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.categoriaEstabelecimentoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'categoriaEstabelecimentoListModification',
                content: 'Deleted an categoriaEstabelecimento'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-categoria-estabelecimento-delete-popup',
    template: ''
})
export class CategoriaEstabelecimentoDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ categoriaEstabelecimento }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CategoriaEstabelecimentoDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.categoriaEstabelecimento = categoriaEstabelecimento;
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
