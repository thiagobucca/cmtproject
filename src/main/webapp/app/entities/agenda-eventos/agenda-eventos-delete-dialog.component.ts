import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAgendaEventos } from 'app/shared/model/agenda-eventos.model';
import { AgendaEventosService } from './agenda-eventos.service';

@Component({
    selector: 'jhi-agenda-eventos-delete-dialog',
    templateUrl: './agenda-eventos-delete-dialog.component.html'
})
export class AgendaEventosDeleteDialogComponent {
    agendaEventos: IAgendaEventos;

    constructor(
        private agendaEventosService: AgendaEventosService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.agendaEventosService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'agendaEventosListModification',
                content: 'Deleted an agendaEventos'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-agenda-eventos-delete-popup',
    template: ''
})
export class AgendaEventosDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ agendaEventos }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AgendaEventosDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.agendaEventos = agendaEventos;
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
