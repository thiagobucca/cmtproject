import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Principal } from '../auth/principal.service';
import { AuthServerProvider } from '../auth/auth-jwt.service';
import { AuxiliarService } from 'app/shared/services/auxiliar.service';
@Injectable({ providedIn: 'root' })
export class LoginService {
    constructor(
        public principal: Principal,
        private authServerProvider: AuthServerProvider,
        private router: Router,
        private auxService: AuxiliarService
    ) {}

    login(credentials, callback?) {
        const cb = callback || function() {};

        return new Promise((resolve, reject) => {
            this.authServerProvider.login(credentials).subscribe(
                data => {
                    this.principal.identity(true).then(account => {
                        resolve(data);
                        this.auxService.isAutenticado = true;
                        if (account) {
                            return this.principal.hasAnyAuthority(['ROLE_USER', 'ROLE_ADMIN', 'ROLE_LOJA_MACONICA']).then(response => {
                                if (!response) {
                                    this.logout();
                                    this.router.navigate(['accessdenied']);
                                } else {
                                    this.router.navigate(['home']);
                                }
                            });
                        }
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
