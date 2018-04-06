import { ApiUrls } from './../api-urls';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
export abstract class ILocalizationService {
    public abstract get availableLangs(): string[];
    public abstract get currentLang(): string;
    public abstract changeLocalization(code: string): void;
    public abstract getLocalizedString(key: string, placeholder?: string): string;
}

const langKey = 'lang';

@Injectable()
export class LocalizationService implements ILocalizationService {
    public currentLang: string;
    public availableLangs: string[];
    private localeObject;

    constructor(private http: HttpClient) {
        this.availableLangs = ['ru', 'en']
        const code = localStorage.getItem(langKey);
        if (code !== null && code !== undefined) {
            this.changeLocalization(code);
        }
    }

    public changeLocalization(code: string): void {
        code.toLowerCase();
        if (code === 'ru') {
            this.localeObject = {
                'login': 'Логин',
                'password': 'Пароль',
                'registration': 'Регистрация',
                'signin': 'Войти',
                'loginFormTitle': 'Форма логина'
            };
        } else {
            this.localeObject = null;
        }
        // this.http.post(ApiUrls.localization, '').toPromise().then(response => {
        //     this.localeObject = response.json();
        //     localStorage.setItem(langKey, code);
        // }).catch(error => {
        //     this.localeObject = null;
        // });
    }

    public getLocalizedString(key: string, placeholder?: string): string {
        if (this.localeObject) {
            const s = this.localeObject[key];
            if (s) {
                return s;
            }
        }
        return placeholder || key;
    }

}
