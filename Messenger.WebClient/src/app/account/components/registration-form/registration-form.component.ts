import { SignInModel, RegisterModel } from '../../models';
import { AccountService } from '../../services';
import { Component } from '@angular/core';

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
    constructor(private accountService: AccountService) {
        accountService.clearErrors();
        this.model = new RegisterModel();
    }

    public register() {
        this.accountService.register(this.model);
    }
}
