import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MyAppRegionModule } from './region/region.module';
import { MyAppCountryModule } from './country/country.module';
import { MyAppLocationModule } from './location/location.module';
import { MyAppDepartmentModule } from './department/department.module';
import { MyAppTaskModule } from './task/task.module';
import { MyAppEmployeeModule } from './employee/employee.module';
import { MyAppJobModule } from './job/job.module';
import { MyAppJobHistoryModule } from './job-history/job-history.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        MyAppRegionModule,
        MyAppCountryModule,
        MyAppLocationModule,
        MyAppDepartmentModule,
        MyAppTaskModule,
        MyAppEmployeeModule,
        MyAppJobModule,
        MyAppJobHistoryModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyAppEntityModule {}
