import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoOperacao } from 'app/shared/model/tipo-operacao.model';
import { TipoOperacaoService } from './tipo-operacao.service';

@Component({
    selector: 'jhi-tipo-operacao-delete-dialog',
    templateUrl: './tipo-operacao-delete-dialog.component.html'
})
export class TipoOperacaoDeleteDialogComponent {
    tipoOperacao: ITipoOperacao;

    constructor(
        private tipoOperacaoService: TipoOperacaoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tipoOperacaoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'tipoOperacaoListModification',
                content: 'Deleted an tipoOperacao'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tipo-operacao-delete-popup',
    template: ''
})
export class TipoOperacaoDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tipoOperacao }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TipoOperacaoDeleteDialogComponent as Component, {
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
