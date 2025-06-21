import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-room',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './book-room.component.html',
  styleUrl: './book-room.component.scss',
})
export class BookRoomComponent {
  selectedRoomName: string = '';
  roomType: string = '';
  showPopup: boolean = false;
  selectedOption: any = null;

  roomOptions: any[] = [];
  allRoomOptions: any = {
    deluxe: [
      {
        title: 'Deluxe - Room Only',
        price: '₹12,000',
        amenities: ['Luxury Bedding', 'City View'],
        advantages: [
          'Most affordable deluxe option',
          'Perfect for short or solo stays',
          'Located on higher floors for better views',
        ],
        offers: '⭐ Save 15% on stays longer than 2 nights',
        image: 'assets/delux1.jpg',
      },
      {
        title: 'Deluxe - With Breakfast',
        price: '₹13,500',
        amenities: ['Breakfast Included', 'Luxury Bedding'],
        advantages: [
          'Complimentary daily breakfast buffet',
          'Great for families or business travelers',
          'Priority early check-in on request',
        ],
        offers: '🍽️ Free breakfast + 10% off room service',
        image: 'assets/delux2.jpg',
      },
      {
        title: 'Deluxe - With Breakfast + Pickup',
        price: '₹15,000',
        amenities: ['Breakfast', 'Pickup', 'Premium Support'],
        advantages: [
          'Includes airport pickup & drop',
          '24/7 concierge support',
          'Faster room service & check-in',
        ],
        offers: '🚗 Free airport transfer + spa voucher worth ₹1,000',
        image: 'assets/delux3.jpg',
      },
    ],
    suite: [
      {
        title: 'Suite - Room Only',
        price: '₹48,000',
        amenities: ['Private Butler', 'Spa Access'],
        advantages: [
          'Dedicated butler service',
          'Complimentary spa access for 2',
          'Spacious suite with living area',
        ],
        offers: '🍾 Welcome champagne + free spa session',
        image: 'assets/suite1.jpg',
      },
      {
        title: 'Suite - With Dinner',
        price: '₹52,000',
        amenities: ['Dinner', 'Ocean View', 'Butler'],
        advantages: [
          'Private dining with chef-curated dinner',
          'Oceanfront balcony with sunset view',
          'Exclusive club access during stay',
        ],
        offers: '🌅 Romantic dinner for 2 + late checkout until 4PM',
        image: 'assets/suite2.jpg',
      },
      {
        title: 'Suite - Full Service',
        price: '₹60,000',
        amenities: ['Airport Pickup', 'All Meals', 'Spa'],
        advantages: [
          'All-inclusive meals from 3 restaurants',
          'On-call chauffeur and personal concierge',
          'Access to rooftop pool and lounge',
        ],
        offers: '🛎️ All meals + complimentary spa & chauffeur service',
        image: 'assets/suite3.jpg',
      },
    ],
    executive: [
      {
        title: 'Executive - Room Only',
        price: '₹18,000',
        amenities: ['Wi-Fi', 'Work Desk'],
        advantages: [
          'Ideal for corporate/business travelers',
          'High-speed internet included',
          'Quiet executive floor with workspace',
        ],
        offers: '💼 Free 1GB/day high-speed data + early check-in',
        image: 'assets/exe1.jpg',
      },
      {
        title: 'Executive - With Breakfast',
        price: '₹20,000',
        amenities: ['Wi-Fi', 'Lounge Access', 'Breakfast'],
        advantages: [
          'Complimentary lounge access',
          'Buffet breakfast included',
          'Express check-in and checkout',
        ],
        offers: '🥐 Free breakfast + 10% off laundry services',
        image: 'assets/exe2.jpg',
      },
      {
        title: 'Executive - Premium Plan',
        price: '₹23,000',
        amenities: ['Cocktails', 'Club Access', 'Concierge'],
        advantages: [
          'Evening cocktails in executive lounge',
          '24/7 concierge and meeting support',
          'Late checkout available on weekends',
        ],
        offers: '🍸 Free evening cocktails + late checkout until 3PM',
        image: 'assets/exe3.jpg',
      },
    ],
  };

  adults: any;
  children: any;
  rooms: any;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.selectedRoomName = params['name'];

      const roomKeyMap: { [key: string]: string } = {
        'Deluxe Room': 'deluxe',
        'Presidential Suite': 'suite',
        'Executive Room': 'executive',
        Deluxe: 'deluxe',
        Suite: 'suite',
        Executive: 'executive',
      };

      const key = roomKeyMap[this.selectedRoomName];

      if (key && this.allRoomOptions[key]) {
        this.roomType = key;
        this.roomOptions = this.allRoomOptions[key];
      } else {
        this.roomOptions = [];
      }
    });
    const storedGuest = sessionStorage.getItem('guestSelection');
    console.log('guest', storedGuest);
    if (storedGuest) {
      const { adults, children, rooms } = JSON.parse(storedGuest);
      this.adults = adults;
      this.children = children;
      this.rooms = rooms;
    }
  }

  openConfirmation(option: any) {
    this.selectedOption = option;
    this.showPopup = true;
  }

  confirmBooking() {
    const bookingDetails = {
      roomType: this.selectedRoomName,
      option: this.selectedOption,
      guests: {
        adults: this.adults,
        children: this.children,
        rooms: this.rooms,
      },
      price: this.selectedOption?.price, // Add this line to include the price
    };

    sessionStorage.setItem(
      'bookingConfirmation',
      JSON.stringify(bookingDetails)
    );

    this.showPopup = false;
    this.router.navigate(['/Hotel/billing']); // Navigate to billing
  }
}
