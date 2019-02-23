import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxCurrencyModule } from 'ngx-currency';
import { CmtprojectSharedModule } from 'app/shared';
import {
    CupomComponent,
    CupomDetailComponent,
    CupomUpdateComponent,
    CupomDeletePopupComponent,
    CupomDeleteDialogComponent,
    cupomRoute,
    cupomPopupRoute
} from './';

export const customCurrencyMaskConfig = {
    align: 'right',
    allowNegative: false,
    allowZero: false,
    decimal: ',',
    precision: 2,
    prefix: 'R$ ',
    suffix: '',
    thousands: '.',
    nullable: true
};

const ENTITY_STATES = [...cupomRoute, ...cupomPopupRoute];

@NgModule({
    imports: [CmtprojectSharedModule, RouterModule.forChild(ENTITY_STATES), NgxCurrencyModule.forRoot(customCurrencyMaskConfig)],
    declarations: [CupomComponent, CupomDetailComponent, CupomUpdateComponent, CupomDeleteDialogComponent, CupomDeletePopupComponent],
    entryComponents: [CupomComponent, CupomUpdateComponent, CupomDeleteDialogComponent, CupomDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmtprojectCupomModule {}
