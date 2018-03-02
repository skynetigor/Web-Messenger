import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { appRoutes } from 'app/app-router';
import { AppComponent } from 'app/app.component';

import { AccountModule } from './account/account.module';
import { ILocalizationService, LocalizationService } from './services/localization.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AccountModule.forRoot(),
    BrowserModule,
    FormsModule,
    appRoutes,
  ],
  providers: [
    { provide: ILocalizationService, useClass: LocalizationService },
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }

