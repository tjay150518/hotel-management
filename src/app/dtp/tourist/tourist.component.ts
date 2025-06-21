import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-tourist',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './tourist.component.html',
  styleUrl: './tourist.component.scss',
})
export class TouristComponent {
  historicalPlaces = [
    {
      title: 'Shahi Qila',
      image: 'assets/test1.jpg',
      description: 'The majestic 14th-century fort by the Sharqi dynasty.',
      rating: 4.7,
    },
    {
      title: 'Atala Masjid',
      image: 'assets/test2.jpg',
      description: 'Built in 1408, an Indo-Islamic architectural marvel.',
      rating: 4.6,
    },
    {
      title: 'Jama Masjid',
      image: 'assets/test3.jpg',
      description: 'One of India’s largest mosques from 1470.',
      rating: 4.5,
    },
    {
      title: 'Sheetala Chaukia Mandir',
      image: 'assets/test4.jpg',
      description: 'A serene temple dedicated to Goddess Sheetala.',
      rating: 4.3,
    },
  ];
}
