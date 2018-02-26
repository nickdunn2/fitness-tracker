import { IUser } from './user.model'
import { IAuthData } from './auth-data.model'
import { Subject } from 'rxjs/Subject'

export class AuthService {
  public authChange = new Subject<boolean>()
  private user: IUser

  public register(authData: IAuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    }
    this.authChange.next(true)
  }

  public login(authData: IAuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    }
    this.authChange.next(true)
  }

  public logout() {
    this.user = null
    this.authChange.next(false)
  }

  public getUser() {
    return { ...this.user }
  }

  public isAuthenticated() {
    return this.user != null
  }
}
