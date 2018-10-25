import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <router-outlet></router-outlet>
  <loader></loader>
  `,
})
export class AppComponent {
  title = 'app';
}
