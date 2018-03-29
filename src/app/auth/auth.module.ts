import { NgModule } from '@angular/core'
import { AngularFireAuthModule } from 'angularfire2/auth'

import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  imports: [
    SharedModule,
    AngularFireAuthModule
  ]
})
export class AuthModule {

}
