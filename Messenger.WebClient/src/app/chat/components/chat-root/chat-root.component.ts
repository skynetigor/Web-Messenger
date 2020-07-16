import { Component } from '@angular/core';
import { MediaQueryService } from '../../../shared/services';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Component({
    selector: 'chat-root',
    templateUrl: 'chat-root.component.html',
    styleUrls: ['chat-root.component.scss']
})
export class ChatRootComponent {
    public isMobile$: Observable<boolean>;

    constructor(private mediaQueryService: MediaQueryService) {
        this.isMobile$ = mediaQueryService.createListener('(max-width: 768px)').pipe(map(t => t.matches));
    }
}
