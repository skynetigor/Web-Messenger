import { Router } from '@angular/router';
import { UserStorage } from './user-storage';
import { Http } from '@angular/http';
import { HttpCustomClient } from './httpclient';
import { SignInModel, RegisterModel, UserModel } from '../models';
import { Injectable } from '@angular/core';
import { ApiUrls } from '../../api-urls';

const isNotNullOrUndefined = (obj: any): boolean => {
    return obj === null || obj === undefined;
};

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

    private authorize(model: any, url: string) {
        this.http.post(url, model).subscribe(response => {
            const data: any = response;
            if (data) {
                this.errors = [];
                this.user = data;
                this.userStorage.setUser(data);
                this.router.navigate(['/chat']);
            }
        }, error => {
            const data: any = error.json();
            if (data) {
                this.errors = [];

                for (const key in data) {
                    const obj = data[key];
                    this.errors.push(obj);
                }
            }
        });
    }

    constructor(private http: HttpCustomClient, private router: Router, private userStorage: UserStorage) { }


    public signIn(model: SignInModel): void {
        this.authorize(model, ApiUrls.signIn);
    }

    public register(model: RegisterModel): void {
        this.authorize(model, ApiUrls.register);
    }

    public signOut(): void {
        this.userStorage.clearUser();
        this.isInRoom = false;
        this.router.navigate(['/login']);
    }

    public clearErrors(): void {
        this.errors = [];
    }
}
