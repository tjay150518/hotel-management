import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-resort',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './resort.component.html',
  styleUrl: './resort.component.scss',
})
export class ResortComponent {
  private images: string[] = ['../../../assets/palace.jpg'];
  backgroundImageUrl: string = this.images[0];
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: [''],
      message: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form Submitted:', this.contactForm.value);
      alert('Thanks for contacting us!');
      this.contactForm.reset();
    }
  }
}
