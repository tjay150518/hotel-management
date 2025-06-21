import { MediaMatcher } from '@angular/cdk/layout';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import Swal from 'sweetalert2';
import { NavBarComponent } from '../../dtp/nav-bar/nav-bar.component';
import { FooterComponent } from '../../dtp/footer/footer.component';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SharedModule, NavBarComponent, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class SalesLayoutComponent {
  isLoading = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isLoading = true;
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        setTimeout(() => {
          this.isLoading = false;
        }, 3000);
      }
    });
  }
}
// {
//   isScrolled = false;

//   @HostListener('window:scroll', [])
//   onWindowScroll() {
//     const navbar = document.getElementById('mainNavbar');
//     const logo = document.getElementById('brandLogo') as HTMLImageElement;

//     if (window.scrollY > 50) {
//       navbar?.classList.add('scrolled-navbar');
//       navbar?.classList.remove('transparent-navbar');
//       if (logo) {
//         logo.src = 'assets/GT_Logo Final-06.png'; // White background version
//       }
//     } else {
//       navbar?.classList.remove('scrolled-navbar');
//       navbar?.classList.add('transparent-navbar');
//       if (logo) {
//         logo.src = 'assets/GT_Logo Final-05.png'; // Transparent version
//       }
//     }
//   }
//   @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;

//   currentIndex = 0;

//   hotels = [
//     {
//       title: 'The Leela Palace Agra',
//       image: 'assets/1.jpg',
//       description:
//         'Located near the Taj Mahal, enjoy regal hospitality and exquisite architecture.',
//     },
//     {
//       title: 'The Leela Sikkim',
//       image: 'assets/2.jpg',
//       description:
//         'Overlooking Gangtok Hill with tranquil Himalayan views and modern luxury.',
//     },
//     {
//       title: 'The Leela Palace Jaipur',
//       image: 'assets/3.jpg',
//       description:
//         'A Rajasthani royal experience with palace-like ambiance and rich heritage.',
//     },
//     {
//       title: 'The Leela Goa',
//       image: 'assets/4.jpg',
//       description:
//         'Tropical elegance with private beaches, spa retreats, and gourmet dining.',
//     },
//     {
//       title: 'The Leela Kovalam',
//       image: 'assets/5.jpg',
//       description:
//         'Cliff-top views of the Arabian Sea with serene Kerala-inspired hospitality.',
//     },
//   ];

//   ngAfterViewInit() {
//     this.scrollToIndex(0);
//   }

//   scrollToIndex(index: number) {
//     const container = this.scrollContainer.nativeElement;
//     const cardWidth = container.offsetWidth;
//     container.scrollTo({
//       left: cardWidth * index,
//       behavior: 'smooth',
//     });
//   }

//   scrollRight() {
//     this.currentIndex = (this.currentIndex + 1) % this.hotels.length; // 🔁 loop forward
//     this.scrollToIndex(this.currentIndex);
//   }

//   scrollLeft() {
//     this.currentIndex =
//       (this.currentIndex - 1 + this.hotels.length) % this.hotels.length; // 🔁 loop backward
//     this.scrollToIndex(this.currentIndex);
//   }
// }
