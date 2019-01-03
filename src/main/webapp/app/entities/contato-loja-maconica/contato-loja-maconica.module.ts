import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmtprojectSharedModule } from 'app/shared';
import {
    ContatoLojaMaconicaComponent,
    ContatoLojaMaconicaDetailComponent,
    ContatoLojaMaconicaUpdateComponent,
    ContatoLojaMaconicaDeletePopupComponent,
    ContatoLojaMaconicaDeleteDialogComponent,
    contatoLojaMaconicaRoute,
    contatoLojaMaconicaPopupRoute
} from './';

const ENTITY_STATES = [...contatoLojaMaconicaRoute, ...contatoLojaMaconicaPopupRoute];

@NgModule({
    imports: [CmtprojectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ContatoLojaMaconicaComponent,
        ContatoLojaMaconicaDetailComponent,
        ContatoLojaMaconicaUpdateComponent,
        ContatoLojaMaconicaDeleteDialogComponent,
        ContatoLojaMaconicaDeletePopupComponent
    ],
    entryComponents: [
        ContatoLojaMaconicaComponent,
        ContatoLojaMaconicaUpdateComponent,
        ContatoLojaMaconicaDeleteDialogComponent,
        ContatoLojaMaconicaDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmtprojectContatoLojaMaconicaModule {}
