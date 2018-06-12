import { RouterModule } from '@angular/router';
import { AuthGuard, LoginFormComponent, RegistrationFormComponent } from './account';

export const appRoutes = RouterModule.forRoot([
    { path: '', redirectTo: 'chat', pathMatch: 'prefix' },
    { path: 'login', component: LoginFormComponent },
    { path: 'registration', component: RegistrationFormComponent },
    { path: 'chat', loadChildren: './chat/chat.module#ChatModule', canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'chat' }
]);
