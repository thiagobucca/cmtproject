import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRelatoriocupomxcmt } from 'app/shared/model/relatoriocupomxcmt.model';

@Component({
    selector: 'jhi-relatoriocupomxcmt-detail',
    templateUrl: './relatoriocupomxcmt-detail.component.html'
})
export class RelatoriocupomxcmtDetailComponent implements OnInit {
    relatoriocupomxcmt: IRelatoriocupomxcmt;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ relatoriocupomxcmt }) => {
            this.relatoriocupomxcmt = relatoriocupomxcmt;
        });
    }

    previousState() {
        window.history.back();
    }
}
