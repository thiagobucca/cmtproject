import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuxiliarService {
    private _storage: any = sessionStorage;
    public isLoading: boolean;

    constructor() {
        this._storage.isLoading = false;
    }

    get isAutenticado(): boolean {
        return this._storage.getItem('isAutenticado') ? this._storage.getItem('isAutenticado') : false;
    }
    set isAutenticado(value: boolean) {
        this._storage.setItem('isAutenticado', value);
    }
}
