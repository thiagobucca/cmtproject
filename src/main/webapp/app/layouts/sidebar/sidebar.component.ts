import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    pathGlobal: string;
}
export const ROUTES: RouteInfo[] = [
    {
        path: 'agenda-eventos',
        title: 'Agenda Eventos',
        icon: 'ui-1_calendar-60',
        class: '',
        pathGlobal: 'global.menu.entities.agendaEventos'
    },
    { path: 'cupom', title: 'Cupom', icon: 'shopping_tag-content', class: '', pathGlobal: 'global.menu.entities.cupom' },

    {
        path: 'comunicacao-push',
        title: 'Comunicação Push',
        icon: 'tech_mobile',
        class: '',
        pathGlobal: 'global.menu.entities.comunicacaoPush'
    },
    {
        path: 'estabelecimento-comercial',
        title: 'Estabelecimento Comercial',
        icon: 'shopping_shop',
        class: '',
        pathGlobal: 'global.menu.entities.estabelecimentoComercial'
    },
    // {
    //     path: 'comunicacao-push-loja',
    //     title: 'Comunicação Push Loja',
    //     icon: 'design_app',
    //     class: '',
    //     pathGlobal: 'global.menu.entities.comunicacaoPushLoja'
    // },
    {
        path: 'contas-pagar-receber',
        title: 'Contas a Pagar/Receber',
        icon: 'business_money-coins',
        class: '',
        pathGlobal: 'global.menu.entities.contasPagarReceber'
    },
    { path: 'loja-maconica', title: 'Loja Maçonica', icon: 'travel_istanbul', class: '', pathGlobal: 'global.menu.entities.lojaMaconica' },
    // {
    //     path: 'contato-estabelecimento',
    //     title: 'Contato Estabelecimento',
    //     icon: 'design_app',
    //     class: '',
    //     pathGlobal: 'global.menu.entities.contatoEstabelecimento'
    // },
    // {
    //     path: 'contato-loja-maconica',
    //     title: 'Contato Loja Maçonica',
    //     icon: 'design_app',
    //     class: '',
    //     pathGlobal: 'global.menu.entities.contatoLojaMaconica'
    // },

    { path: 'tipo-operacao', title: 'Tipo Operação', icon: 'design_vector', class: '', pathGlobal: 'global.menu.entities.tipoOperacao' },

    { path: 'parametrizacao', title: 'Parametrização', icon: 'loader_gear', class: '', pathGlobal: 'global.menu.entities.parametrizacao' },
    {
        path: 'categoria-estabelecimento',
        title: 'Categoria Estabelecimento',
        icon: 'design_app',
        class: '',
        pathGlobal: 'global.menu.entities.categoriaEstabelecimento'
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
