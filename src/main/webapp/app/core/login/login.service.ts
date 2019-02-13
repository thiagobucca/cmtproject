import { Injectable } from '@angular/core';

import { Principal } from '../auth/principal.service';
import { AuthServerProvider } from '../auth/auth-jwt.service';
import { AuxiliarService } from 'app/shared/services/auxiliar.service';
@Injectable({ providedIn: 'root' })
export class LoginService {
    constructor(public principal: Principal, private authServerProvider: AuthServerProvider, private auxService: AuxiliarService) {
        debugger;
    }

    login(credentials, callback?) {
        const cb = callback || function() {};

        return new Promise((resolve, reject) => {
            this.authServerProvider.login(credentials).subscribe(
                data => {
                    this.principal.identity(true).then(account => {
                        resolve(data);
                        this.auxService.isAutenticado = true;
                    });
                    return cb();
                },
                err => {
                    this.logout();
                    reject(err);
                    return cb(err);
                }
            );
        });
    }

    loginWithToken(jwt, rememberMe) {
        return this.authServerProvider.loginWithToken(jwt, rememberMe);
    }

    logout() {
        this.authServerProvider.logout().subscribe();
        this.principal.authenticate(null);
        this.auxService.isAutenticado = false;
    }
}
