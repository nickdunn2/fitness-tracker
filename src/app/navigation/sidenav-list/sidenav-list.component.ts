import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core'
import { AuthService } from '../../auth/auth.service'
import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() sidenavClosed = new EventEmitter<void>()
  public isAuthenticated = false
  private authSub: Subscription

  constructor(private auth: AuthService) {

  }

  ngOnInit() {
    this.authSub = this.auth.authChange.subscribe(status => {
      this.isAuthenticated = status
    })
  }

  closeSidenav() {
    this.sidenavClosed.emit()
  }

  logout() {
    this.closeSidenav()
    this.auth.logout()
  }

  ngOnDestroy() {
    if (this.authSub) {
      this.authSub.unsubscribe()
    }
  }
}
