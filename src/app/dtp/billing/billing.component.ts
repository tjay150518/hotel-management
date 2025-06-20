import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.scss',
})
export class BillingComponent {
  booking: any;
  basePrice: number = 0;
  taxAmount: number = 0;
  totalAmount: number = 0;

  ngOnInit() {
    const stored = sessionStorage.getItem('bookingConfirmation');
    if (stored) {
      this.booking = JSON.parse(stored);
      const rawPrice = this.booking?.option?.price?.replace(/[^0-9]/g, '');
      this.basePrice = Number(rawPrice);
      this.taxAmount = Math.round(this.basePrice * 0.18); // 18% GST
      this.totalAmount = this.basePrice + this.taxAmount;
    }
  }
}
