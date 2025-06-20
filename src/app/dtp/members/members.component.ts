import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss',
})
export class MembersComponent {
  activeIndex = 0;
  transitioning = false;
  direction: 'left' | 'right' = 'left';
  currentBackground = 'assets/member1.jpg';

  cards = [
    {
      title: 'PRIORITY RESERVATIONS',
      description:
        'Get early access to bookings, peak-time reservations, and exclusive event invites as a premium member.',
      background: 'assets/member1.jpg',
    },
    {
      title: 'LOUNGE ACCESS',
      description:
        'Enjoy up to 12 complimentary entries per year to The Chambers — our members-only luxury lounge.',
      background: 'assets/member2.jpg',
    },
    {
      title: 'WELLNESS PRIVILEGES',
      description:
        'Complimentary spa sessions and wellness packages curated exclusively for members.',
      background: 'assets/member3.jpg',
    },
    {
      title: 'GOURMET REWARDS',
      description:
        'Earn dining points and enjoy complimentary meals during special member appreciation events.',
      background: 'assets/member4.jpg',
    },
    {
      title: 'STAY UPGRADE BENEFITS',
      description:
        'Automatic room upgrades and flexible late check-outs for our valued loyalty members.',
      background: 'assets/member5.jpg',
    },
  ];

  next() {
    this.direction = 'left';
    this.animateSlide(() => {
      this.activeIndex = (this.activeIndex + 1) % this.cards.length;
      this.currentBackground = this.cards[this.activeIndex].background;
    });
  }

  prev() {
    this.direction = 'right';
    this.animateSlide(() => {
      this.activeIndex =
        (this.activeIndex - 1 + this.cards.length) % this.cards.length;
      this.currentBackground = this.cards[this.activeIndex].background;
    });
  }

  animateSlide(callback: () => void) {
    this.transitioning = true;

    setTimeout(() => {
      callback();
      this.transitioning = false;
    }, 800); // match CSS animation time
  }
}
