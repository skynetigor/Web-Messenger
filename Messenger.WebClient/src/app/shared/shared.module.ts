import { ModuleWithProviders, NgModule } from '@angular/core';

import { MediaQueryService, MessageBusService } from './services';

@NgModule({

})

export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [MediaQueryService, MessageBusService]
        };
    }
}
