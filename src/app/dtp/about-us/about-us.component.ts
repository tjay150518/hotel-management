import { Component, NgZone } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
})
export class AboutUsComponent {
  activeSection: any;
  animateSignatureHeading = false;
  constructor(private ngZone: NgZone) {}
  activeImage: string = '';

  images: string[] = ['../../../assets/IMG_0967.JPG'];

  backgroundImageUrl: string = this.images[0];

  sections = [
    {
      title: 'Royal Palace Experience',
      bg: '../../../assets/IMG_0968.JPG',
      topics: [
        'Luxury Suites',
        'Grand Ballrooms',
        'Heritage Museum',
        'Fine Dining Halls',
      ],
      description:
        'Step into the grandeur of our royal palaces, where opulence meets history. Explore timeless architecture, host events in majestic ballrooms, and stay in suites that once housed royalty.',
    },
    {
      title: 'Modern Hotel Comforts',
      bg: '../../../assets/IMG_0971.JPG',
      topics: [
        'Executive Rooms',
        'Skyline Views',
        'Business Center',
        '24/7 Concierge',
      ],
      description:
        'Enjoy world-class amenities in our contemporary hotels. Designed for both business and leisure, our hotels offer panoramic city views, smart rooms, and personalized services.',
    },
    {
      title: 'Exquisite Dining Delights',
      bg: '../../../assets/IMG_0974.JPG',
      topics: [
        'Multi-Cuisine Restaurant',
        'Private Dining',
        'Live Grill Stations',
        'Sunday Brunch',
      ],
      description:
        'Savor gourmet experiences with global flavors. From intimate private dining to elaborate buffets and chef-curated menus, our dining spaces cater to every culinary desire.',
    },
    {
      title: 'Nature Retreat & Safari',
      bg: '../../../assets/IMG_0976.JPG',
      topics: [
        'Luxury Tents',
        'Wildlife Jeep Tours',
        'Starlit Campfires',
        'Tribal Cuisine',
      ],
      description:
        'Reconnect with nature in our safari lodges. Witness wildlife up close, enjoy eco-luxury stays, dine under the stars, and immerse in authentic local culture and cuisine.',
    },
  ];

  branches = [
    {
      title: 'Royal Palace Experience',
      description:
        'Step into the grandeur of our royal palaces, where opulence meets history...',
    },
    {
      title: 'Modern Hotel Comforts',
      description: 'Enjoy world-class amenities in our contemporary hotels...',
    },
    {
      title: 'Exquisite Dining Delights',
      description: 'Savor gourmet experiences with global flavors...',
    },
    {
      title: 'Nature Retreat & Safari',
      description: 'Reconnect with nature in our safari lodges...',
    },
  ];

  ngOnInit() {
    // Set the first one as the default active on load
    this.setActive(this.sections[0]);
  }
  ngAfterViewInit(): void {
    this.observeHeadingSection();
  }

  setActive(section: any) {
    this.activeSection = section;
    this.activeImage = section.bg;
  }

  getBgPosition(index: number): string {
    const xPos = index * 33.3333; // 0%, 33.3%, 66.6%, 100%
    return `${xPos}% 0%`;
  }
  observeHeadingSection() {
    const section = document.querySelector('#animated-section');
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        this.ngZone.run(() => {
          this.animateSignatureHeading = entry.isIntersecting;
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
  }
}
