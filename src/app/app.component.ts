import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { ProgressBarService } from './services/progress-bar.service';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SharedModule, NgxUiLoaderModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loading = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      }

      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        // Add small delay so image has time to render
        setTimeout(() => {
          this.loading = false;
        }, 300); // adjust as needed
      }
    });
  }
  ngOnInit(): void {}
}
