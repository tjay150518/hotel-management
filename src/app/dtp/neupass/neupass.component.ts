import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-neupass',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './neupass.component.html',
  styleUrl: './neupass.component.scss',
})
export class NeupassComponent {
  backgroundImageUrl: string = '../../../assets/neupass.png';

  membershipTiers = [
    {
      name: 'Platinum',
      class: 'platinum-tier',
      tagline: 'Luxury Redefined',
      benefits: [
        'Suite Upgrade',
        '24/7 Concierge',
        'Spa Access',
        'Airport Pickup',
      ],
    },
    {
      name: 'Gold',
      class: 'gold-tier',
      tagline: 'Elite Privileges',
      benefits: [
        'Room Upgrade',
        'Early Check-in',
        'Late Checkout',
        'Free Breakfast',
      ],
    },
    {
      name: 'Silver',
      class: 'silver-tier',
      tagline: 'Smart Choices',
      benefits: ['Free WiFi', 'Earn NeuCoins', 'Priority Support'],
    },
    {
      name: 'Copper',
      class: 'copper-tier',
      tagline: 'Welcome Benefits',
      benefits: ['Welcome Drink', 'Access to Lounge', '10% off on Dining'],
    },
  ];

  selectedTier: any = null;
  // allBenefits: string[] = [];

  constructor() {
    // Build a master list of all unique benefits
    const benefitSet = new Set<string>();
    this.membershipTiers.forEach((tier) => {
      tier.benefits.forEach((benefit) => benefitSet.add(benefit));
    });
    this.allBenefits = Array.from(benefitSet);
  }

  selectTier(tier: any) {
    this.selectedTier = tier;
  }

  allBenefits: string[] = [
    'Suite Upgrade',
    '24/7 Concierge',
    'Spa Access',
    'Airport Pickup',
    'Room Upgrade',
    'Early Check-in',
    'Late Checkout',
    'Free Breakfast',
    'Free WiFi',
    'Earn NeuCoins',
    'Priority Support',
    'Welcome Drink',
    'Access to Lounge',
    '10% off on Dining',
  ];
  getEligibility(tierName: string): string {
    switch (tierName) {
      case 'Platinum':
        return '20 room nights or INR 5 lakhs of spends';
      case 'Gold':
        return '10 room nights or INR 2 lakhs of spends';
      case 'Silver':
        return '7 room nights or INR 50000 lakh of spends';
      case 'Copper':
        return 'Base Tier';
      default:
        return '—';
    }
  }

  hasBenefit(tier: any, benefit: string): boolean {
    return tier.benefits.includes(benefit);
  }
}
