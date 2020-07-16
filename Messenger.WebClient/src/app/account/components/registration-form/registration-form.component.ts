import { SignInModel, RegisterModel } from '../../models';
import { AccountService } from '../../services';
import { Component } from '@angular/core';
import { LoaderService } from 'src/app/chat/modules/loader';

@Component({
    selector: 'login',
    templateUrl: 'registration-form.component.html',
    styleUrls: ['registration.css']
})

export class RegistrationFormComponent {
    public model: RegisterModel;

    public get errors(): string[] {
        return this.accountService.errors;
    }
    constructor(private accountService: AccountService, private loadingService: LoaderService) {
        accountService.clearErrors();
        this.model = new RegisterModel();
    }

    public register() {
       this.loadingService.useLoader(this.accountService.register(this.model), 'Creating account...');
    }
}
