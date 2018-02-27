import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core'
import { AuthService } from '../../auth/auth.service'
import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggled = new EventEmitter<void>()
  public isAuthenticated = false
  private authSub: Subscription

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.authSub = this.auth.authChange.subscribe(status => {
      this.isAuthenticated = status
    })
  }

  toggleSidenav() {
    this.sidenavToggled.emit()
  }

  logout() {
    this.auth.logout()
  }

  ngOnDestroy() {
    this.authSub.unsubscribe()
  }
}
