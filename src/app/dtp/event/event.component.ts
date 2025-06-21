import { Component, NgZone } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss',
})
export class EventComponent {
  images: string[] = ['assets/meeting.jpg'];
  animateSignatureHeading = false;

  backgroundImageUrl: string = this.images[0];
  constructor(private ngZone: NgZone, private titleService: Title) {}

  ngAfterViewInit(): void {
    this.observeHeadingSection();
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
  cards = [
    {
      img: 'assets/EVENT1.jpg',
      title: 'CULINARY EXCELLENCE',
    },
    {
      img: 'assets/EVENT2.jpg',
      title: 'FLAVOURS OF LUXURY',
    },
    {
      img: 'assets/EVENT3.jpg',
      title: 'NATURE MEETS ELEGANCE',
    },
    {
      img: 'assets/EVENT4.jpg',
      title: 'ROYAL COMFORT',
    },
    {
      img: 'assets/event6.jpg',
      title: 'CELEBRATION UNDER THE STARS',
    },
  ];
  scrollLeft(wrapper: HTMLElement): void {
    wrapper.scrollBy({ left: -400, behavior: 'smooth' });
  }

  scrollRight(wrapper: HTMLElement): void {
    wrapper.scrollBy({ left: 400, behavior: 'smooth' });
  }
}
