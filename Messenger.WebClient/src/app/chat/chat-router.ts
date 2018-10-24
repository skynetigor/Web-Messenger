import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/account';
import { ChatRootComponent } from './components';

export const ChatRouter = RouterModule.forChild([
    { path: '', component: ChatRootComponent, canActivate: [AuthGuard] }
]);
