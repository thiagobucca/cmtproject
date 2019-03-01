import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMembro } from 'app/shared/model/membro.model';

@Component({
    selector: 'jhi-membro-detail',
    templateUrl: './membro-detail.component.html'
})
export class MembroDetailComponent implements OnInit {
    membro: IMembro;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ membro }) => {
            this.membro = membro;
        });
    }

    previousState() {
        window.history.back();
    }
}
