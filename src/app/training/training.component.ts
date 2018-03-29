import { Component, OnDestroy, OnInit } from '@angular/core'
import { TrainingService } from './training.service'
import { Subscription } from 'rxjs/Subscription'
import { Exercise } from './exercise.model'
import { UIService } from '../shared/ui.service'

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  public ongoingTraining = false
  public exercises: Exercise[]
  public exerciseSub: Subscription
  public isLoading = true
  private exercisesSub: Subscription
  private loadingSub: Subscription

  constructor(private trainingService: TrainingService, private uiService: UIService) { }

  ngOnInit() {
    this.loadingSub = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading
    })

    this.exercisesSub = this.trainingService.exercisesChanged.subscribe(exercises => {
      this.exercises = exercises
    })

    this.trainingService.fetchAvailableExercises()

    this.exerciseSub = this.trainingService.exerciseChanged.subscribe(ex => {
      this.ongoingTraining = !!ex
    })
  }

  ngOnDestroy() {
    if (this.exerciseSub) {
      this.exerciseSub.unsubscribe()
    }
    if (this.exercisesSub) {
      this.exercisesSub.unsubscribe()
    }
    if (this.loadingSub) {
      this.loadingSub.unsubscribe()
    }
  }
}
