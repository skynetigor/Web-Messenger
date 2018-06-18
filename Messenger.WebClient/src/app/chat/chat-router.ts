import { ChatPageComponent } from './components';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/account';

export const ChatRouter = RouterModule.forChild([
    { path: '', component: ChatPageComponent, canActivate: [AuthGuard] }
]);
