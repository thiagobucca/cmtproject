import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CmtprojectRegionModule } from './region/region.module';
import { CmtprojectCountryModule } from './country/country.module';
import { CmtprojectLocationModule } from './location/location.module';
import { CmtprojectDepartmentModule } from './department/department.module';
import { CmtprojectTaskModule } from './task/task.module';
import { CmtprojectEmployeeModule } from './employee/employee.module';
import { CmtprojectJobModule } from './job/job.module';
import { CmtprojectJobHistoryModule } from './job-history/job-history.module';
import { CmtprojectCategoriaEstabelecimentoModule } from './categoria-estabelecimento/categoria-estabelecimento.module';
import { CmtprojectPerfilUsuarioModule } from './perfil-usuario/perfil-usuario.module';
import { CmtprojectTipoOperacaoModule } from './tipo-operacao/tipo-operacao.module';
import { CmtprojectLojaMaconicaModule } from './loja-maconica/loja-maconica.module';
import { CmtprojectEstabelecimentoComercialModule } from './estabelecimento-comercial/estabelecimento-comercial.module';
import { CmtprojectContatoLojaMaconicaModule } from './contato-loja-maconica/contato-loja-maconica.module';
import { CmtprojectContatoEstabelecimentoModule } from './contato-estabelecimento/contato-estabelecimento.module';
import { CmtprojectParametrizacaoModule } from './parametrizacao/parametrizacao.module';
import { CmtprojectUsuarioModule } from './usuario/usuario.module';
import { CmtprojectPessoaModule } from './pessoa/pessoa.module';
import { CmtprojectComunicacaoPushModule } from './comunicacao-push/comunicacao-push.module';
import { CmtprojectAgendaEventosModule } from './agenda-eventos/agenda-eventos.module';
import { CmtprojectContasPagarReceberModule } from './contas-pagar-receber/contas-pagar-receber.module';
import { CmtprojectCupomModule } from './cupom/cupom.module';
import { CmtprojectComunicacaoPushLojaModule } from './comunicacao-push-loja/comunicacao-push-loja.module';
import { CmtprojectRelatoriocupomxcmtModule } from './relatoriocupomxcmt/relatoriocupomxcmt.module';
import { CmtprojectRelatoriocontapagarreceberModule } from './relatoriocontapagarreceber/relatoriocontapagarreceber.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        CmtprojectRegionModule,
        CmtprojectCountryModule,
        CmtprojectLocationModule,
        CmtprojectDepartmentModule,
        CmtprojectTaskModule,
        CmtprojectEmployeeModule,
        CmtprojectJobModule,
        CmtprojectJobHistoryModule,
        CmtprojectCategoriaEstabelecimentoModule,
        CmtprojectPerfilUsuarioModule,
        CmtprojectTipoOperacaoModule,
        CmtprojectLojaMaconicaModule,
        CmtprojectEstabelecimentoComercialModule,
        CmtprojectContatoLojaMaconicaModule,
        CmtprojectContatoEstabelecimentoModule,
        CmtprojectParametrizacaoModule,
        CmtprojectUsuarioModule,
        CmtprojectPessoaModule,
        CmtprojectComunicacaoPushModule,
        CmtprojectAgendaEventosModule,
        CmtprojectContasPagarReceberModule,
        CmtprojectCupomModule,
        CmtprojectComunicacaoPushLojaModule,
        CmtprojectRelatoriocupomxcmtModule,
        CmtprojectRelatoriocontapagarreceberModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmtprojectEntityModule {}
