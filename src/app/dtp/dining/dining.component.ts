import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-dining',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './dining.component.html',
  styleUrl: './dining.component.scss',
})
export class DiningComponent {
  autoScrollInterval: any;

  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;
  private images: string[] = ['../../../assets/test5.jpg'];
  backgroundImageUrl: string = this.images[0];

  private currentIndex1 = 0;
  animateSignatureHeading = false;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.currentImageIndexes = new Array(this.hotels.length).fill(0);
  }

  currentIndex = 0;

  hotels = [
    {
      title: 'Delicious Noodles Delight',
      images: [
        'assets/nod1.jpg',
        'assets/nod2.jpg',
        'assets/nod3.jpg',
      ],
      description:
        'Freshly cooked noodles with vibrant veggies and authentic spices.',
    },
    {
      title: 'Juicy Gourmet Steaks',
      images: [
        'assets/steak1.jpg',
        'assets/steak2.jpg',
        'assets/steak3.jpg',
      ],
      description:
        'Savor the taste of perfectly cooked steaks with rich flavors.',
    },
    {
      title: 'Creamy Ice Cream Treats',
      images: [
        'assets/ice1.jpg',
        'assets/ice2.jpg',
        'assets/ice3.jpg',
      ],
      description:
        'Delightful creamy ice creams with a variety of flavors and toppings.',
    },
    {
      title: 'Exquisite Seafood Platter',
      images: [
        'assets/sea1.jpg',
        'assets/sea2.jpeg',
        'assets/sea3.jpg',
      ],
      description:
        'Fresh seafood delicacies with vibrant flavors and elegant presentation.',
    },
    {
      title: 'Decadent Chocolate Desserts',
      images: [
        'assets/choco1.jpg',
        'assets/choco2.jpg',
        'assets/choco3.jpg',
      ],
      description:
        'Rich and smooth chocolate desserts to satisfy your sweet cravings.',
    },
  ];

  ngAfterViewInit(): void {
    this.scrollToIndex(0);
    this.observeHeadingSection();
    this.startAutoScroll();
  }

  scrollToIndex(index: number) {
    const cardWidth = this.scrollContainer.nativeElement.offsetWidth * 0.3 + 24; // 30% card width + 24px gap
    const scrollPosition = cardWidth * index;

    this.scrollContainer.nativeElement.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    });
  }
  observeHeadingSection() {
    const section = document.querySelector('.animated-section');
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        this.animateSignatureHeading = entry.isIntersecting;
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
  }

  scrollRight() {
    if (this.currentIndex < this.hotels.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
    this.scrollToIndex(this.currentIndex);
  }

  scrollLeft() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.hotels.length - 1;
    }
    this.scrollToIndex(this.currentIndex);
  }

  currentImageIndexes: number[] = new Array(this.hotels.length).fill(0);
  hoverIntervals: any[] = new Array(this.hotels.length).fill(null);

  onCardHover(index: number) {
    if (!this.hoverIntervals[index]) {
      this.hoverIntervals[index] = setInterval(() => {
        const images = this.hotels[index].images;
        this.currentImageIndexes[index] =
          (this.currentImageIndexes[index] + 1) % images.length;
      }, 3000); // every 3 seconds
    }
  }

  onCardLeave(index: number) {
    clearInterval(this.hoverIntervals[index]);
    this.hoverIntervals[index] = null;
    this.currentImageIndexes[index] = 0; // Reset to first image
  }
  startAutoScroll() {
    const container = this.scrollContainer.nativeElement;

    this.autoScrollInterval = setInterval(() => {
      // Scroll 1px every 20ms
      if (
        container.scrollLeft >=
        container.scrollWidth - container.clientWidth
      ) {
        container.scrollLeft = 0; // Reset scroll position to start for infinite effect
      } else {
        container.scrollLeft += 1;
      }
    }, 20);
  }

  stopAutoScroll() {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
      this.autoScrollInterval = null;
    }
  }

  ngOnDestroy() {
    this.stopAutoScroll();
  }
}
