import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmtprojectSharedModule } from 'app/shared';
import {
    ContatoEstabelecimentoComponent,
    ContatoEstabelecimentoDetailComponent,
    ContatoEstabelecimentoUpdateComponent,
    ContatoEstabelecimentoDeletePopupComponent,
    ContatoEstabelecimentoDeleteDialogComponent,
    contatoEstabelecimentoRoute,
    contatoEstabelecimentoPopupRoute
} from './';

const ENTITY_STATES = [...contatoEstabelecimentoRoute, ...contatoEstabelecimentoPopupRoute];

@NgModule({
    imports: [CmtprojectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ContatoEstabelecimentoComponent,
        ContatoEstabelecimentoDetailComponent,
        ContatoEstabelecimentoUpdateComponent,
        ContatoEstabelecimentoDeleteDialogComponent,
        ContatoEstabelecimentoDeletePopupComponent
    ],
    entryComponents: [
        ContatoEstabelecimentoComponent,
        ContatoEstabelecimentoUpdateComponent,
        ContatoEstabelecimentoDeleteDialogComponent,
        ContatoEstabelecimentoDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmtprojectContatoEstabelecimentoModule {}
