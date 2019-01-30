import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IParametrizacao } from 'app/shared/model/parametrizacao.model';
import { ParametrizacaoService } from './parametrizacao.service';

@Component({
    selector: 'jhi-parametrizacao-delete-dialog',
    templateUrl: './parametrizacao-delete-dialog.component.html'
})
export class ParametrizacaoDeleteDialogComponent {
    parametrizacao: IParametrizacao;

    constructor(
        private parametrizacaoService: ParametrizacaoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.parametrizacaoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'parametrizacaoListModification',
                content: 'Deleted an parametrizacao'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-parametrizacao-delete-popup',
    template: ''
})
export class ParametrizacaoDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ parametrizacao }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ParametrizacaoDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.parametrizacao = parametrizacao;
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
