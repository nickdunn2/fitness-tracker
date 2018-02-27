import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { MatDialog } from '@angular/material'
import { StopTrainingComponent } from '../stop-training/stop-training.component'

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  public progress = 0
  private timer: any
  @Output() trainingExited = new EventEmitter()

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.startOrResumeTimer()
  }

  private startOrResumeTimer() {
    this.timer = setInterval(() => {
      this.progress += 1
      if (this.progress >= 100) {
        clearInterval(this.timer)
      }
    }, 200)
  }

  stopProgress() {
    clearInterval(this.timer)
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    })

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.trainingExited.emit()
      } else {
        this.startOrResumeTimer()
      }
    })
  }
}
