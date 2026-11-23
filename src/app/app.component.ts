import { Component, inject } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet />',
})
export class AppComponent {
  private readonly viewportScroller = inject(ViewportScroller);
  private readonly router = inject(Router);

  constructor() {
    this.viewportScroller.setOffset(() => [
      0,
      document.querySelector<HTMLElement>('.header')?.offsetHeight ?? 0,
    ]);

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(event => {
        const fragment = this.router.parseUrl(event.urlAfterRedirects).fragment;
        if (!fragment) {
          return;
        }

        requestAnimationFrame(() => {
          requestAnimationFrame(() => this.viewportScroller.scrollToAnchor(fragment));
        });
      });
  }
}
