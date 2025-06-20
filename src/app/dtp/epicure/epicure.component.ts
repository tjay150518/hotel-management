import { Component, AfterViewInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-epicure',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './epicure.component.html',
  styleUrl: './epicure.component.scss',
})
export class EpicureComponent implements AfterViewInit {
  slides = [
    {
      image: '../../../assets/epicure1.jpg',
      caption: 'EXCLUSIVE STAY BENEFITS',
    },
    {
      image: '../../../assets/epicure2.jpg',
      caption: 'HERITAGE STAYS WITH REGAL CHARM',
    },
    {
      image: '../../../assets/epicure3.jpg',
      caption: 'WELLNESS & RELAXATION',
    },
    {
      image: '../../../assets/epicure4.jpg',
      caption: 'TENTED CAMPS & SAFARI LUXURY',
    },
    {
      image: '../../../assets/epicure5.jpg',
      caption: 'CHEF-CURATED EXPERIENCES',
    },
    {
      image: '../../../assets/epicure6.jpg',
      caption: 'PEACEFUL VIEWS & SUNSETS',
    },
    {
      image: '../../../assets/epicure7.jpg',
      caption: 'SERENITY AMONG THE CLOUDS',
    },
  ];
  testimonials = [
    {
      quote:
        'An unforgettable stay. The Epicure spa and food made me feel pampered like never before.',
      name: 'Sophia M., Travel Blogger',
    },
    {
      quote: 'The royal room and private chef were outstanding!',
      name: 'James L., Celebrity Chef',
    },
  ];
  services = [
    {
      icon: '🏨',
      title: 'Private Villas',
      desc: 'Elegant, exclusive villas with private pools.',
    },
    {
      icon: '🍽️',
      title: 'Chef on Call',
      desc: 'Curated dining experiences with our chefs.',
    },
    {
      icon: '🧖',
      title: 'Spa & Wellness',
      desc: 'Rejuvenate with holistic wellness treatments.',
    },
    {
      icon: '🌅',
      title: 'Sunset Views',
      desc: 'Enjoy tranquil views from hilltops and waterfronts.',
    },
  ];

  currentCaption: string = this.slides[0].caption;

  ngAfterViewInit(): void {
    this.updateCaption();
  }

  onSlideChange(): void {
    setTimeout(() => this.updateCaption(), 50);
  }

  updateCaption(): void {
    const activeItem = document.querySelector('.carousel-item.active');
    if (activeItem) {
      const caption = activeItem.getAttribute('data-caption');
      if (caption) {
        this.currentCaption = caption;
      }
    }
  }
}
