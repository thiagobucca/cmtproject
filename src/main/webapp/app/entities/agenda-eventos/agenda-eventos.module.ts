import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmtprojectSharedModule } from 'app/shared';
import {
    AgendaEventosComponent,
    AgendaEventosDetailComponent,
    AgendaEventosUpdateComponent,
    AgendaEventosDeletePopupComponent,
    AgendaEventosDeleteDialogComponent,
    agendaEventosRoute,
    agendaEventosPopupRoute
} from './';

const ENTITY_STATES = [...agendaEventosRoute, ...agendaEventosPopupRoute];

@NgModule({
    imports: [CmtprojectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AgendaEventosComponent,
        AgendaEventosDetailComponent,
        AgendaEventosUpdateComponent,
        AgendaEventosDeleteDialogComponent,
        AgendaEventosDeletePopupComponent
    ],
    entryComponents: [
        AgendaEventosComponent,
        AgendaEventosUpdateComponent,
        AgendaEventosDeleteDialogComponent,
        AgendaEventosDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmtprojectAgendaEventosModule {}
