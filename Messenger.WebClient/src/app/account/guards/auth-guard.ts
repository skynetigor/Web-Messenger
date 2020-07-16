import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


import { ApiUrls } from '../../api-urls';
import { UserStorage } from '../services';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private userStorage: UserStorage, private router: Router, private http: HttpClient) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.userStorage.getUser();
        console.log(user);
        if (user) {
            const url = ApiUrls.checkUser + '?userId=' + user.id + '&userName=' + user.userName;
            return this.http.get(url).pipe(map(response => true), catchError(response => {
                if (response.status === 401) {
                    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                    return of(false);
                }
            }));
        }

        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return of(false);
    }
}
