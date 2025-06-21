import { Routes } from '@angular/router';
import { SalesLayoutComponent } from './sales/layout/layout.component';
import { AuthguardService } from './services/authguard.service';
import { HomePageComponent } from './dtp/home-page/home-page.component';
import { DiningComponent } from './dtp/dining/dining.component';
import { AboutUsComponent } from './dtp/about-us/about-us.component';
import { TimelessWeddingComponent } from './dtp/timeless-wedding/timeless-wedding.component';
import { MembersComponent } from './dtp/members/members.component';
import { WellnessComponent } from './dtp/wellness/wellness.component';
import { EventComponent } from './dtp/event/event.component';
import { TravelComponent } from './dtp/travel/travel.component';
import { ResortComponent } from './dtp/resort/resort.component';
import { BookRoomComponent } from './dtp/book-room/book-room.component';
import { OffersComponent } from './dtp/offers/offers.component';
import { EpicureComponent } from './dtp/epicure/epicure.component';
import { BookStayComponent } from './dtp/book-stay/book-stay.component';
import { NeupassComponent } from './dtp/neupass/neupass.component';
import { BillingComponent } from './dtp/billing/billing.component';
import { TouristComponent } from './dtp/tourist/tourist.component';
export const routes: Routes = [
  // Default route now redirects to dashboard under Hotel
  { path: '', redirectTo: 'Hotel/Home-page', pathMatch: 'full' },

  //   { path: 'customer-login', component: CustomerLoginComponent },

  {
    path: 'Hotel',
    component: SalesLayoutComponent,
    children: [
      { path: 'Home-page', component: HomePageComponent },
      { path: 'Dining', component: DiningComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'timeless-wedding', component: TimelessWeddingComponent },
      { path: 'members', component: MembersComponent },
      { path: 'wellness', component: WellnessComponent },
      { path: 'event', component: EventComponent },
      { path: 'travel', component: TravelComponent },
      { path: 'resort', component: ResortComponent },
      { path: 'room-book', component: BookRoomComponent },
      { path: 'offer', component: OffersComponent },
      { path: 'epicure', component: EpicureComponent },
      { path: 'book-stay', component: BookStayComponent },
      { path: 'neupass', component: NeupassComponent },
      { path: 'billing', component: BillingComponent },
      { path: 'tourist', component: TouristComponent },
    ],
  },
];
