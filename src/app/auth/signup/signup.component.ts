import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { AuthService } from '../auth.service'
import { UIService } from '../../shared/ui.service'
import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
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
  public isLoading = false
  private loadingSub: Subscription

  public get email() { return this.signupForm.get('email') }
  public get password() { return this.signupForm.get('password') }
  public get birthdate() { return this.signupForm.get('birthdate') }
  public maxDate: Date

  constructor(private fb: FormBuilder, private auth: AuthService,
              private uiService: UIService) {
    this.maxDate = new Date()
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }

  ngOnInit() {
    this.loadingSub = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading
    })
  }

  submitForm() {
    this.auth.register({
      email: this.email.value,
      password: this.password.value
    })
  }

  ngOnDestroy() {
    this.loadingSub.unsubscribe()
  }
}
