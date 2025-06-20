import {
  Component,
  ElementRef,
  HostListener,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [SharedModule, MatCardModule],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.scss',
})
export class OffersComponent {
  private images: string[] = ['../../../assets/offer.jpg'];
  backgroundImageUrl: string = this.images[0];
  offers = [
    {
      image: '../../../assets/offer.jpg',
      title: 'SUNSET SANCTUARY – PRIVATE BEACH DINING',
      description:
        'Dine under the stars with a candlelit setup on the beach, accompanied by live music and a curated seafood menu.',
      validity: 'Valid on Fridays & Saturdays',
    },
    {
      image: '../../../assets/offer1.jpeg',
      title: 'MORNING BLISS – YOGA & JUICE BAR EXPERIENCE',
      description:
        'Start your day with a guided sunrise yoga session followed by detox juices and a wellness breakfast.',
      validity: 'Daily | 6 AM to 9 AM',
    },
    {
      image: '../../../assets/offer2.jpg',
      title: 'POOLSIDE PAMPER – CABANA LUXE PACKAGE',
      description:
        'Reserve a private cabana with personalized butler service, mocktails, and a mini spa foot massage by the pool.',
      validity: 'Weekends | 10 AM – 4 PM',
    },
    {
      image: '../../../assets/offer3.jpg',
      title: 'PALACE SUITE UPGRADE – ROYAL LIVING',
      description:
        'Upgrade to our signature Palace Suite with complimentary champagne, personal concierge, and airport transfers.',
      validity: 'Valid on bookings for 2 nights or more',
    },
    {
      image: '../../../assets/TEA.jpg',
      title: 'HERITAGE HIGH TEA – GARDEN COURTYARD',
      description:
        'Savor a regal high-tea experience with local sweets, artisanal teas, and classical live music in the garden.',
      validity: 'Daily | 4 PM – 6 PM',
    },
    {
      image: '../../../assets/offer4.jpg',
      title: 'AYURVEDA AWAKENING – 3-DAY RETREAT',
      description:
        'Immerse in holistic wellness with therapeutic massages, consultations, and sattvic meals.',
      validity: 'Every weekend | Book in advance',
    },
    {
      image: '../../../assets/offer5.jpg',
      title: 'VINTAGE DRIVE EXPERIENCE – ROYAL RIDE',
      description:
        'Take a chauffeured ride in a classic vintage car to explore local sights with complimentary picnic hamper.',
      validity: 'Available on request',
    },
  ];
  @ViewChildren('card') cards!: QueryList<ElementRef>;
  isCardInView: boolean[] = [];

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkCardVisibility();
  }

  ngAfterViewInit(): void {
    this.checkCardVisibility();
  }

  checkCardVisibility() {
    this.cards.forEach((card: any, index: any) => {
      const rect = card.nativeElement.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight - 100;
      this.isCardInView[index] = isVisible;
    });
  }
}
