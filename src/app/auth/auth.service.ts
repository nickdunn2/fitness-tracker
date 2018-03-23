import { IAuthData } from './auth-data.model'
import { Subject } from 'rxjs/Subject'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { AngularFireAuth } from 'angularfire2/auth'
import { TrainingService } from '../training/training.service'

@Injectable()
export class AuthService {
  public authChange = new Subject<boolean>()
  private _isAuthenticated = false

  constructor(private router: Router, private afAuth: AngularFireAuth,
              private trainingService: TrainingService) {}

  public initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this._isAuthenticated = true
        this.authChange.next(true)
        this.router.navigate(['/training'])
      } else {
        this.trainingService.cancelSubscriptions()
        this.authChange.next(false)
        this.router.navigate(['/login'])
        this._isAuthenticated = false
      }
    })
  }

  public register(authData: IAuthData) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log('register result -', result)
      }).catch(err => {
        console.error(err)
      })
  }

  public login(authData: IAuthData) {
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log('login result -', result)
      }).catch(err => {
        console.error(err)
      })
  }

  public logout() {
    this.afAuth.auth.signOut()
  }

  public get isAuthenticated() {
    return this._isAuthenticated
  }
}
