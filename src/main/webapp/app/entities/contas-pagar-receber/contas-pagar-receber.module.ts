import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxCurrencyModule } from 'ngx-currency';
import { CmtprojectSharedModule } from 'app/shared';
import {
    ContasPagarReceberComponent,
    ContasPagarReceberDetailComponent,
    ContasPagarReceberUpdateComponent,
    ContasPagarReceberDeletePopupComponent,
    ContasPagarReceberDeleteDialogComponent,
    contasPagarReceberRoute,
    contasPagarReceberPopupRoute
} from './';

const ENTITY_STATES = [...contasPagarReceberRoute, ...contasPagarReceberPopupRoute];

export const customCurrencyMaskConfig = {
    align: 'right',
    allowNegative: false,
    allowZero: true,
    decimal: ',',
    precision: 2,
    prefix: 'R$ ',
    suffix: '',
    thousands: '.',
    nullable: true
};
@NgModule({
    imports: [CmtprojectSharedModule, RouterModule.forChild(ENTITY_STATES), NgxCurrencyModule.forRoot(customCurrencyMaskConfig)],
    declarations: [
        ContasPagarReceberComponent,
        ContasPagarReceberDetailComponent,
        ContasPagarReceberUpdateComponent,
        ContasPagarReceberDeleteDialogComponent,
        ContasPagarReceberDeletePopupComponent
    ],
    entryComponents: [
        ContasPagarReceberComponent,
        ContasPagarReceberUpdateComponent,
        ContasPagarReceberDeleteDialogComponent,
        ContasPagarReceberDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmtprojectContasPagarReceberModule {}
