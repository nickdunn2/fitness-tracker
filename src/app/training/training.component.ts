import { Component, OnDestroy, OnInit } from '@angular/core'
import { TrainingService } from './training.service'
import { Subscription } from 'rxjs/Subscription'
import { Exercise } from './exercise.model'

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  public ongoingTraining = false
  public exercises: Exercise[]
  public exerciseSub: Subscription
  private exercisesSub: Subscription

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exercisesSub = this.trainingService.exercisesChanged.subscribe(exercises => {
      this.exercises = exercises
    })

    this.trainingService.fetchAvailableExercises()

    this.exerciseSub = this.trainingService.exerciseChanged.subscribe(ex => {
      this.ongoingTraining = !!ex
    })
  }

  ngOnDestroy() {
    this.trainingService.exerciseChanged.unsubscribe()
    this.trainingService.exercisesChanged.unsubscribe()
  }
}
