import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements AfterViewInit {
  isScrolled = false;
  brandLogoUrl = 'assets/GT_Logo Final-05.png';
  showPopup = false;
  adults = 1;
  children = 0;
  rooms = 1;
  showGuestSelector = false;

  constructor(private router: Router) {
    // Handle router changes if necessary
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => this.checkScroll(), 100);
      }
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScroll();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.checkScroll();
    }, 100);
  }

  showDropdown = false;

  megaMenuItems = [
    {
      image: 'assets/more1.jpg',
      label: 'Wellness',
      link: '/Hotel/wellness',
    },
    {
      image: 'assets/more2.jpg',
      label: 'Timeless Wedding',
      link: '/Hotel/timeless-wedding',
    },
    {
      image: 'assets/more3.jpg',
      label: 'Event',
      link: '/Hotel/event',
    },
    // {
    //   image: 'assets/more4.jpg',
    //   label: 'Tourist',
    //   link: '/Hotel/tourist',
    // },
    {
      image: 'assets/IMG_0968.JPG',
      label: 'Contact Us',
      link: '/Hotel/resort',
    },
  ];
  showMembershipDropdown = false;

  membershipItems = [
    {
      image: 'assets/nav4.jpg',
      label: 'Neupass',
      link: '/Hotel/neupass',
    },
    {
      image: 'assets/IMG_0974.JPG',
      label: 'Epicure',
      link: '/Hotel/epicure',
    },
    {
      image: 'assets/IMG_0967.JPG',
      label: 'Business Connect',
      link: '/Hotel/members',
    },
  ];

  checkScroll() {
    const offset =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    // this.isScrolled = offset > 50;

    // Always use the animated logo
    this.brandLogoUrl = 'assets/GT_Logo Final-06.png';
  }

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  bookData() {
    this.showPopup = false;
    this.router.navigate(['/Hotel/book-stay']);
  }

  toggleGuestSelector() {
    this.showGuestSelector = !this.showGuestSelector;
  }

  increase(type: string) {
    if (type === 'adults') this.adults++;
    else if (type === 'children') this.children++;
    else if (type === 'rooms') this.rooms++;

    this.storeGuestInfo();
  }

  decrease(type: string) {
    if (type === 'adults' && this.adults > 1) this.adults--;
    else if (type === 'children' && this.children > 0) this.children--;
    else if (type === 'rooms' && this.rooms > 1) this.rooms--;

    this.storeGuestInfo();
  }
  storeGuestInfo() {
    const guestData = {
      adults: this.adults,
      children: this.children,
      rooms: this.rooms,
    };

    sessionStorage.setItem('guestSelection', JSON.stringify(guestData));
  }
  closeNavbar() {
    const navbarToggler = document.querySelector(
      '.navbar-toggler'
    ) as HTMLElement;
    const navbarCollapse = document.querySelector('.navbar-collapse');

    const isMobile = window.innerWidth <= 768;

    if (
      isMobile &&
      navbarToggler &&
      navbarCollapse?.classList.contains('show')
    ) {
      navbarToggler.click();
    }
  }
  toggleMembershipDropdown(event: Event) {
    event.preventDefault(); // prevent scrolling to top
    if (!this.isDesktop()) {
      this.showMembershipDropdown = !this.showMembershipDropdown;
    }
  }

  isDesktop(): boolean {
    return window.innerWidth > 768;
  }
}
