import { switchMap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { UserModel } from './../models/user.model';
import { UserStorage } from './user-storage';

const authHeaderName = 'auth-messenger';

@Injectable()
export class HttpCustomClient {
    private createAuthorizationHeader(): HttpHeaders {
        const headers = new HttpHeaders();
        headers.append('Accept', 'application\json');
        const user: UserModel = this.tokenManager.getUser();
        if (user !== null && user !== undefined) {
            headers.append('Authorization', 'Bearer ' + user.token);
        }
        return headers;
    }

    constructor(private http: HttpClient, private tokenManager: UserStorage, private router: Router) { }

    public get(url: string) {
        return this.http.get(url, {
            headers: this.createAuthorizationHeader()
        });
    }

    public post(url: string, data: any) {
        return this.http.post(url, data, {
            headers: this.createAuthorizationHeader()
        });
    }
}
