import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    pathGlobal: string;
    permissao: string[];
}
export const ROUTES: RouteInfo[] = [
    {
        path: 'agenda-eventos',
        title: 'Agenda Eventos',
        icon: 'ui-1_calendar-60',
        class: '',
        pathGlobal: 'global.menu.entities.agendaEventos',
        permissao: ['ROLE_ADMIN', 'ROLE_USER']
    },
    {
        path: 'cupom',
        title: 'Cupom',
        icon: 'shopping_tag-content',
        class: '',
        pathGlobal: 'global.menu.entities.cupom',
        permissao: ['ROLE_ADMIN', 'ROLE_USER']
    },

    {
        path: 'comunicacao-push',
        title: 'Comunicação Push',
        icon: 'tech_mobile',
        class: '',
        pathGlobal: 'global.menu.entities.comunicacaoPush',
        permissao: ['ROLE_ADMIN', 'ROLE_USER']
    },
    {
        path: 'estabelecimento-comercial',
        title: 'Estabelecimento Comercial',
        icon: 'shopping_shop',
        class: '',
        pathGlobal: 'global.menu.entities.estabelecimentoComercial',
        permissao: ['ROLE_ADMIN', 'ROLE_USER']
    },

    {
        path: 'contas-pagar-receber',
        title: 'Contas a Pagar/Receber',
        icon: 'business_money-coins',
        class: '',
        pathGlobal: 'global.menu.entities.contasPagarReceber',
        permissao: ['ROLE_ADMIN', 'ROLE_USER']
    },
    {
        path: 'loja-maconica',
        title: 'Loja Maçônica',
        icon: 'travel_istanbul',
        class: '',
        pathGlobal: 'global.menu.entities.lojaMaconica',
        permissao: ['ROLE_ADMIN', 'ROLE_USER']
    },

    {
        path: 'tipo-operacao',
        title: 'Tipo Operação',
        icon: 'design_vector',
        class: '',
        pathGlobal: 'global.menu.entities.tipoOperacao',
        permissao: ['ROLE_ADMIN', 'ROLE_USER']
    },

    {
        path: 'parametrizacao',
        title: 'Parametrização',
        icon: 'loader_gear',
        class: '',
        pathGlobal: 'global.menu.entities.parametrizacao',
        permissao: ['ROLE_ADMIN', 'ROLE_USER']
    },
    {
        path: 'categoria-estabelecimento',
        title: 'Categoria Estabelecimento h',
        icon: 'design_app',
        class: '',
        pathGlobal: 'global.menu.entities.categoriaEstabelecimento',
        permissao: ['ROLE_USER']
    }
];

@Component({
    selector: 'jhi-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.scss']
})
export class SidebarComponent implements OnInit {
    menuItems: any[];

    constructor() {}

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    isMobileMenu() {
        if (window.innerWidth > 991) {
            return false;
        }
        return true;
    }
}
