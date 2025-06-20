import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  ViewChild,
} from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements AfterViewInit {
  @ViewChild('carousel') carousel!: ElementRef;
  @ViewChild('exploreSection') exploreSection!: ElementRef;
  @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;

  inView = false;
  activeIndex = 1;
  backgroundLoaded = false;

  constructor(private zone: NgZone, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.inView = true;
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    if (this.exploreSection?.nativeElement) {
      observer.observe(this.exploreSection.nativeElement);
    }

    const img = new Image();
    img.src = this.cards[this.activeIndex].background;

    img.onload = () => {
      this.cdr.detectChanges();

      setTimeout(() => {
        this.scrollToActive();
      }, 0);
    };

    if (this.bgVideo?.nativeElement) {
      const video = this.bgVideo.nativeElement;
      video.muted = true;
      video.play().catch((error) => {
        console.warn('Autoplay prevented:', error);
      });
    }
  }

  scrollLeft() {
    this.activeIndex =
      this.activeIndex > 0 ? this.activeIndex - 1 : this.cards.length - 1;
    this.scrollToActive();
  }

  scrollRight() {
    this.activeIndex =
      this.activeIndex < this.cards.length - 1 ? this.activeIndex + 1 : 0;
    this.scrollToActive();
  }

  scrollToActive() {
    const cardEl = this.carousel.nativeElement.children[this.activeIndex];
    cardEl.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  }

  cards = [
    {
      image: '../../../assets/1.jpg',
      background: '../../../assets/1.jpg',
      title: 'Luxury Suite Room',
      description:
        'Indulge in our spacious suite rooms featuring elegant interiors...',
    },
    {
      image: '../../../assets/2.jpg',
      background: '../../../assets/2.jpg',
      title: 'Infinity Pool & Leisure',
      description: 'Relax by our serene infinity pool...',
    },
    {
      // image: '../../../assets/3.jpg',
      image: '../../../assets/IMG_0971.JPG',
      background: '../../../assets/IMG_0971.JPG',
      title: 'Comfortable Standard Rooms',
      description: 'Enjoy comfort and convenience...',
    },
    {
      image: '../../../assets/4.jpg',
      background: '../../../assets/4.jpg',
      title: 'Gourmet Dining Experience',
      description: 'Savor a variety of culinary delights...',
    },
    {
      image: '../../../assets/5.jpg',
      background: '../../../assets/5.jpg',
      title: 'Our Hotel Property',
      description: 'Discover the elegance of our hotel property...',
    },
    {
      image: '../../../assets/6.jpg',
      background: '../../../assets/6.jpg',
      title: 'Fitness & Wellness Gym',
      description:
        'Stay active with our state-of-the-art fitness center equipped with modern gym facilities...',
    },
  ];
}
