import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AccountModule } from './account/account.module';
import { appRoutes } from './app-router';
import { AppComponent } from './app.component';
import { ILocalizationService, LocalizationService } from './services/localization.service';
import { SharedModule } from './shared';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AccountModule.forRoot(),
    BrowserModule,
    FormsModule,
    appRoutes,
    SharedModule.forRoot()
  ],
  providers: [
    { provide: ILocalizationService, useClass: LocalizationService },
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }

