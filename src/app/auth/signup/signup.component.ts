import { Component } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  public signupForm = this.fb.group({
    'email': ['', [
      Validators.required,
      Validators.email
    ]],
    'password': ['', [
      Validators.required,
      Validators.minLength(6)
    ]],
    'birthdate': ['', [ Validators.required ]],
    'agree': ['', [ Validators.required ]],
  })

  public get email() { return this.signupForm.get('email') }
  public get password() { return this.signupForm.get('password') }
  public get birthdate() { return this.signupForm.get('birthdate') }
  public maxDate: Date

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.maxDate = new Date()
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }

  submitForm() {
    this.auth.register({
      email: this.email.value,
      password: this.password.value
    })
  }
}
