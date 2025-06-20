import { Component, NgZone } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-wellness',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './wellness.component.html',
  styleUrl: './wellness.component.scss',
})
export class WellnessComponent {
  images: string[] = ['../../../assets/spa.jpg'];

  backgroundImageUrl: string = this.images[0];
  animateSignatureHeading = false;
  constructor(private ngZone: NgZone) {}
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
}
