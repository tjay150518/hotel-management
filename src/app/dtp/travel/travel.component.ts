import { Component, NgZone } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-travel',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './travel.component.html',
  styleUrl: './travel.component.scss',
})
export class TravelComponent {
  animateSignatureHeading = false;

  private images: string[] = ['assets/Travel.jpg'];
  backgroundImageUrl: string = this.images[0];
  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.observeHeadingSection();
  }
  cards = [
    {
      title: 'Resorts Hideaways',
      image: '../../../assets/travel3.jpg',

      description:
        'Retreat to serene luxury, where breath taking escapes meet comfort.',
    },
    {
      title: 'Homely Stays',
      image: '../../../assets/travel4.jpg',

      description:
        'Feel at home while you travel, with cozy and comfortable stays.',
    },
    {
      title: 'Mountain Escapes',
      image: '../../../assets/travel1.jpg',

      description:
        'Fresh air, tranquil views, and peaceful surroundings await you.',
    },
    {
      title: 'Beachfront Bliss',
      image: '../../../assets/travel5.jpg',

      description:
        'Step out onto soft sands and turquoise waters at our beach resorts.',
    },
  ];

  currentIndex = 1;

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.cards.length;
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.cards.length) % this.cards.length;
  }

  getPrevIndex(): number {
    return (this.currentIndex - 1 + this.cards.length) % this.cards.length;
  }

  getNextIndex(): number {
    return (this.currentIndex + 1) % this.cards.length;
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
