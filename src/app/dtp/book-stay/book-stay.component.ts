import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-stay',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './book-stay.component.html',
  styleUrl: './book-stay.component.scss',
})
export class BookStayComponent {
  constructor(private router: Router) {}

  hotelRooms = [
    {
      image: 'assets/room1.jpg',
      name: 'Deluxe Room',
      description:
        'Spacious and elegant, the Deluxe Room offers plush bedding, Italian marble bathrooms, and panoramic city or sea views. Ideal for a restful stay with refined comfort.',
      features: [
        'Premium king-size bed with Egyptian cotton sheets',
        'Marble-clad bathroom with soaking tub',
        'Automated mood lighting & curtain control',
        'City or sea-facing floor-to-ceiling windows',
      ],
      price: '₹12,000',
      route: '/deluxe',
    },
    {
      image: 'assets/room3.jpg',
      name: 'Presidential Suite',
      description:
        'The epitome of luxury, the Presidential Suite boasts a private elevator, in-room spa, personal butler, and dedicated dining area with a grand piano for bespoke experiences.',
      features: [
        'Private elevator access and entrance lobby',
        'Personal 24/7 butler and concierge service',
        'In-suite spa & massage room',
        'Private dining room with chef-on-request',
      ],
      price: '₹48,000',
      route: '/suite',
    },
    {
      image: 'assets/room5.jpg',
      name: 'Executive Room',
      description:
        'Tailored for business and short luxury stays, the Executive Room features modern workspace, club lounge access, and a fully stocked personal minibar.',
      features: [
        'Ergonomic workstation with high-speed Wi-Fi',
        'Access to Executive Club Lounge',
        "Complimentary evening cocktails & hors d'oeuvres",
        'Personalized wake-up and turn-down service',
      ],
      price: '₹18,000',
      route: '/executive',
    },
  ];

  navigateTo(routeName: string, roomName: string) {
    this.router.navigate(['/Hotel/room-book'], {
      queryParams: { name: roomName },
    });
  }
}
