import { Subject } from 'rxjs/Subject'
import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material'

@Injectable()
export class UIService {
  public loadingStateChanged = new Subject<boolean>()

  constructor(private snackbar: MatSnackBar) {}

  public showSnackbar(message: string, action: any, duration: number) {
    this.snackbar.open(message, action, {
      duration
    })
  }
}
