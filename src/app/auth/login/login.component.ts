import { Component } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'

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

  constructor(private fb: FormBuilder) { }

  submitForm() {
    console.log('loginForm --', this.loginForm)
  }
}
