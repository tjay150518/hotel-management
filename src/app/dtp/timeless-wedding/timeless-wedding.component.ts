import { Component, NgZone } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-timeless-wedding',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './timeless-wedding.component.html',
  styleUrl: './timeless-wedding.component.scss',
})
export class TimelessWeddingComponent {
  images: string[] = ['assets/wed.png'];

  backgroundImageUrl: string = this.images[0];
  animateSignatureHeading = false;
  constructor(private ngZone: NgZone, private titleService: Title) { }

  ngAfterViewInit(): void {
    this.observeHeadingSection();
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
  // In your component.ts
  selectedIndex = 0;

  weddingTabs = [
    {
      title: 'HALDI',
      image: 'assets/haldi1.jpg',
      description:
        'Escape into paradise and celebrate your love with an unforgettable honeymoon experience.',
    },
    {
      title: 'SANGEET',
      image: 'assets/sangeet1.jpg',
      description:
        'Reaffirm your love in a heartfelt ceremony surrounded by those who matter most.',
    },
    {
      title: 'COUPLE SHOOTS',
      image: 'assets/photo.jpg',
      description:
        'Immortalize your love with a romantic photoshoot, capturing the essence of your bond.',
    },
    {
      title: 'COCKTAIL',
      image: 'assets/cocktail.jpg',
      description:
        'Celebrate with elegance in a cocktail evening filled with glamour and cheer.',
    },

    {
      title: 'MEHNDI',
      image: 'assets/mehandi1.jpg',
      description:
        'Celebrate tradition and beauty with intricate mehndi designs in a joyful pre-wedding ritual.',
    },
    {
      title: 'ENGAGEMENT',
      image: 'assets/engagement1.jpg',
      description:
        'Mark the beginning of your forever journey with a beautiful and intimate engagement ceremony.',
    },

    {
      title: 'WEDDING CEREMONY',
      image: 'assets/wedding1.jpg',
      description:
        'Tie the knot in a magical setting where traditions meet timeless elegance.',
    },
    {
      title: 'RECEPTION',
      image: 'assets/reception1.jpg',
      description:
        'Celebrate your union with a luxurious reception, surrounded by love and laughter.',
    },
  ];

  selectTab(index: number) {
    this.selectedIndex = index;
  }

  scrollLeft() {
    const container = document.querySelector(
      '.menu-items-wrapper'
    ) as HTMLElement;
    container.scrollLeft -= 150;
  }

  scrollRight() {
    const container = document.querySelector(
      '.menu-items-wrapper'
    ) as HTMLElement;
    container.scrollLeft += 150;
  }
}
