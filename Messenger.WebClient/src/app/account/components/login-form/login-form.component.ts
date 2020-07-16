import { ILocalizationService } from './../../../services/localization.service';
import { Component } from '@angular/core';
import { SignInModel } from '../../models';
import { AccountService } from '../../services';
import { LoaderService } from 'src/app/chat/modules/loader';

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

    constructor(private accountService: AccountService, private localizationService: ILocalizationService, private loadingService: LoaderService) {
        accountService.clearErrors();
        this.model = new SignInModel();
    }

    public changeLocalization(code: string): void {
        this.localizationService.changeLocalization(code);
    }

    public signIn() {
       this.loadingService.useLoader(this.accountService.signIn(this.model), 'Authorizing...');
    }

    public localize(key: string, placeholder: string): string {
        return this.localizationService.getLocalizedString(key, placeholder);
    }
}
