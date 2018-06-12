import { ILocalizationService } from './../../../services/localization.service';
import { Component } from '@angular/core';
import { SignInModel } from '../../models';
import { AccountService } from '../../services';

@Component({
    selector: 'login',
    templateUrl: 'login-form.component.html',
    styleUrls: ['../../account.css'],
})

export class LoginFormComponent {

    public model: SignInModel;

    public get errors(): string[] {
        return this.accountService.errors;
    }

    public get availableLangs(): string[] {
        return this.localizationService.availableLangs;
    }

    constructor(private accountService: AccountService, private localizationService: ILocalizationService) {
        accountService.clearErrors();
        this.model = new SignInModel();
    }

    public changeLocalization(code: string): void {
        this.localizationService.changeLocalization(code);
    }

    public signIn() {
        this.accountService.signIn(this.model);
    }

    public localize(key: string, placeholder: string): string {
        return this.localizationService.getLocalizedString(key, placeholder);
    }
}
