import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { LoginFormComponent, RegistrationFormComponent } from './components';
import { AuthGuard } from './guards';
import { AccountService, HttpCustomClient, UserStorage } from './services';
import { RouterModule } from '@angular/router';

const providers = [
    AccountService,
    HttpCustomClient,
    UserStorage,
    AuthGuard
];

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        FormsModule,
        HttpClientModule
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
        };
    }
}
