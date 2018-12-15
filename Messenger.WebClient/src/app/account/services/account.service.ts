import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ApiUrls } from '../../api-urls';
import { RegisterModel, SignInModel, UserModel } from '../models';
import { HttpCustomClient } from './httpclient';
import { UserStorage } from './user-storage';
import { Observable, of } from 'rxjs';


@Injectable()
export class AccountService {
    private user: UserModel;
    public isInRoom: boolean;

    public errors: string[] = [];

    public get currentUser(): UserModel {
        if (!this.user) {
            this.user = this.userStorage.getUser();
        }
        return this.user;
    }

    private authorize(model: any, url: string): Observable<any> {
        const obs = this.http.post(url, model);
        obs.subscribe(response => {
            const data: any = response;
            if (data) {
                this.errors = [];
                this.user = data;
                this.userStorage.setUser(data);
                this.router.navigate(['/chat']);
            }
        }, e => {
            const data: any = e.error.errors;
            
            if (data) {
                this.errors = [];

                // tslint:disable-next-line:forin
                for (const key in data) {
                    const obj = data[key];
                    this.errors.push(obj);
                }
            }

            console.log(e);
        });

        return obs;
    }

    constructor(private http: HttpCustomClient, private router: Router, private userStorage: UserStorage) { }

    public signIn(model: SignInModel): Observable<any> {
       return this.authorize(model, ApiUrls.signIn);
    }

    public register(model: RegisterModel): Observable<any> {
        return this.authorize(model, ApiUrls.register);
    }

    public signOut(): Observable<any> {
        this.userStorage.clearUser();
        this.isInRoom = false;
        this.router.navigate(['/login']);
        return of();
    }

    public clearErrors(): void {
        this.errors = [];
    }
}
