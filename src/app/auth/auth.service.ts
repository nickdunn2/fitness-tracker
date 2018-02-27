import { IUser } from './user.model'
import { IAuthData } from './auth-data.model'
import { Subject } from 'rxjs/Subject'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

@Injectable()
export class AuthService {
  public authChange = new Subject<boolean>()
  private user: IUser

  constructor(private router: Router) {}

  public register(authData: IAuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    }

    this.handleAuthSuccess()
  }

  public login(authData: IAuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    }

    this.handleAuthSuccess()
  }

  public logout() {
    this.user = undefined
    this.authChange.next(false)
    this.router.navigate(['/login'])
  }

  public getUser() {
    return { ...this.user }
  }

  public isAuthenticated() {
    return this.user !== undefined
  }

  private handleAuthSuccess() {
    this.authChange.next(true)
    this.router.navigate(['/training'])
  }
}
