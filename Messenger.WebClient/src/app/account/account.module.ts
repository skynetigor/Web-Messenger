import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { LoginFormComponent, RegistrationFormComponent } from './components';
import { AuthGuard } from './guards';
import { AccountService, HttpClient, UserStorage } from './services';
import { RouterModule } from '@angular/router';

const providers = [
    AccountService,
    HttpClient,
    UserStorage,
    AuthGuard
];

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        FormsModule,
        HttpModule
    ],
    declarations: [
        LoginFormComponent,
        RegistrationFormComponent,
    ],
    providers: providers
})

export class AccountModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: AccountModule,
            providers: providers
        }
    }
}
