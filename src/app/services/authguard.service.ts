// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { SalesService } from './sales.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthguardService {

//   constructor(private router: Router, private salesService: SalesService) { }

//   async canActivate(): Promise<boolean> {
//     let getToken = sessionStorage.getItem('token');
//     // debugger
//     if (!getToken) {
//       return true; // Allow access to login if not logged in
//     } else {
//       return false;
//     }
//   }
// }
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './../auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthguardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true; // Allow access if authenticated
    } else {
      this.router.navigate(['/customer-login']); // Redirect to login if not authenticated
      return false;
    }
  }
  // canActivate(): boolean {
  //   // ✅ Allow route if it's a Google Translate hash change
  //   if (window.location.hash && window.location.hash.includes('googtrans')) {
  //     return true;
  //   }

  //   if (this.authService.isAuthenticated()) {
  //     return true; // Allow access if authenticated
  //   } else {
  //     this.router.navigate(['/customer-login']); // Redirect to login if not authenticated
  //     return false;
  //   }
  // }
}
