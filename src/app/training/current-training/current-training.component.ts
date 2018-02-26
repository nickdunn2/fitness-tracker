import { Component, OnInit } from '@angular/core'
import Timer = NodeJS.Timer
import { MatDialog } from '@angular/material'
import { StopTrainingComponent } from '../stop-training/stop-training.component'

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  public progress = 0
  private timer: Timer

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.timer = setInterval(() => {
      this.progress += 1
      if (this.progress >= 100) {
        clearInterval(this.timer)
      }
    }, 200)
  }

  stopProgress() {
    clearInterval(this.timer)
    this.dialog.open(StopTrainingComponent)
  }
}
