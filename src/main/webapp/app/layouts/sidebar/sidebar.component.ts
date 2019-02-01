import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    pathGlobal: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'agenda-eventos', title: 'Agenda Eventos', icon: 'design_app', class: '', pathGlobal: 'global.menu.entities.agendaEventos' },
    {
        path: 'categoria-estabelecimento',
        title: 'Categoria Estabelecimento',
        icon: 'design_app',
        class: '',
        pathGlobal: 'global.menu.entities.categoriaEstabelecimento'
    },
    {
        path: 'comunicacao-push',
        title: 'Comunicação Push',
        icon: 'design_app',
        class: '',
        pathGlobal: 'global.menu.entities.comunicacaoPush'
    },
    {
        path: 'comunicacao-push-loja',
        title: 'Comunicação Push Loja',
        icon: 'design_app',
        class: '',
        pathGlobal: 'global.menu.entities.comunicacaoPushLoja'
    },
    {
        path: 'contas-pagar-receber',
        title: 'Contas a Pagar/Receber',
        icon: 'design_app',
        class: '',
        pathGlobal: 'global.menu.entities.contasPagarReceber'
    },
    {
        path: 'contato-estabelecimento',
        title: 'Contato Estabelecimento',
        icon: 'design_app',
        class: '',
        pathGlobal: 'global.menu.entities.contatoEstabelecimento'
    },
    {
        path: 'contato-loja-maconica',
        title: 'Contato Loja Maçonica',
        icon: 'design_app',
        class: '',
        pathGlobal: 'global.menu.entities.contatoLojaMaconica'
    },

    { path: 'tipo-operacao', title: 'Tipo Operação', icon: 'design_app', class: '', pathGlobal: 'global.menu.entities.tipoOperacao' },
    { path: 'loja-maconica', title: 'Loja Maçonica', icon: 'design_app', class: '', pathGlobal: 'global.menu.entities.lojaMaconica' },
    {
        path: 'estabelecimento-comercial',
        title: 'Estabelecimento Comercial',
        icon: 'design_app',
        class: '',
        pathGlobal: 'global.menu.entities.estabelecimentoComercial'
    },
    { path: 'parametrizacao', title: 'Parametrização', icon: 'design_app', class: '', pathGlobal: 'global.menu.entities.parametrizacao' },

    { path: 'cupom', title: 'Cupom', icon: 'design_app', class: '', pathGlobal: 'global.menu.entities.cupom' }
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
