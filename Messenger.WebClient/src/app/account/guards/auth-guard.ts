import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserStorage } from '../services';
import { ApiUrls } from 'app/api-urls';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private userStorage: UserStorage, private router: Router, private http: Http) { }

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
