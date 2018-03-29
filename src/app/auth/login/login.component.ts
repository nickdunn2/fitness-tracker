import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { AuthService } from '../auth.service'
import { UIService } from '../../shared/ui.service'
import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm = this.fb.group({
    'email': ['', [
      Validators.required,
      Validators.email
    ]],
    'password': ['', [ Validators.required ]]
  })
  public isLoading = false
  private loadingSub: Subscription

  public get email() { return this.loginForm.get('email') }
  public get password() { return this.loginForm.get('password') }

  constructor(private fb: FormBuilder, private auth: AuthService,
              private uiService: UIService) { }

  ngOnInit() {
    this.loadingSub = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading
    })
  }

  submitForm() {
    this.auth.login({
      email: this.email.value,
      password: this.password.value
    })
  }

  ngOnDestroy() {
    if (this.loadingSub) {
      this.loadingSub.unsubscribe()
    }
  }
}
