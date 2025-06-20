import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authFinanceService = inject(AuthService)
  const router = inject(Router)

  if(authFinanceService.isAuthenticated()){
    return true;
  }
  else{
    router.navigate(['']);
    return false;
  }};
