import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('token');
  }
}
