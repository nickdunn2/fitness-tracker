import { Component, OnDestroy, OnInit } from '@angular/core'
import { TrainingService } from './training.service'
import { Exercise } from './exercise.model'
import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  public ongoingTraining = false
  public exercises: Exercise[] = []
  public exerciseSub: Subscription

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exercises = this.trainingService.availableExercises
    this.exerciseSub = this.trainingService.exerciseChanged.subscribe(ex => {
      this.ongoingTraining = !!ex
    })
  }

  ngOnDestroy() {
    this.trainingService.exerciseChanged.unsubscribe()
  }
}
