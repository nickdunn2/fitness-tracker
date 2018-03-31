import { CanLoad, Route, Router } from '@angular/router'
import { Injectable } from '@angular/core'
import { AuthService } from './auth.service'

@Injectable()
export class AuthGuard implements CanLoad {
  constructor(private auth: AuthService, private router: Router) {}

  canLoad(route: Route) {
    if (this.auth.isAuthenticated) {
      return true
    } else {
      this.router.navigate(['/login'])
    }
  }
}
