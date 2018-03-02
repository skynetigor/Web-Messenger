import { ChatPageComponent } from './components';
import { RouterModule } from '@angular/router';

export const ChatRouter = RouterModule.forChild([
    { path: '', component: ChatPageComponent }
]);
