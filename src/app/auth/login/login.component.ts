import { Component } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginForm = this.fb.group({
    'email': ['', [
      Validators.required,
      Validators.email
    ]],
    'password': ['', [ Validators.required ]]
  })

  public get email() { return this.loginForm.get('email') }
  public get password() { return this.loginForm.get('password') }

  constructor(private fb: FormBuilder, private auth: AuthService) { }

  submitForm() {
    this.auth.login({
      email: this.email.value,
      password: this.password.value
    })
  }
}
