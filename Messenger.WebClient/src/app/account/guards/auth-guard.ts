import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ApiUrls } from '../../api-urls';
import { Observable } from 'rxjs/Observable';

import { UserStorage } from '../services';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private userStorage: UserStorage, private router: Router, private http: HttpClient) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.userStorage.getUser();

        if (user) {
            const url = ApiUrls.checkUser + '?userId=' + user.id + '&userName=' + user.userName;
            return this.http.get(url).switchMap(response => {
                return Observable.of(true);
            }).catch(response => {
                if (response.status === 401) {
                    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                    return Observable.of(false);
                }
            })
        }
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return Observable.of(false);
    }
}
