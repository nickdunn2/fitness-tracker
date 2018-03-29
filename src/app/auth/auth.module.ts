import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { FlexLayoutModule } from '@angular/flex-layout'
import { AngularFireAuthModule } from 'angularfire2/auth'

import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component'
import { MaterialModule } from '../material.module'

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    AngularFireAuthModule
  ]
})
export class AuthModule {

}
