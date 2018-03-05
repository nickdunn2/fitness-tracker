import { Component, OnDestroy, OnInit } from '@angular/core'
import { TrainingService } from './training.service'
import { Subscription } from 'rxjs/Subscription'
import { AngularFirestore } from 'angularfire2/firestore'
import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  public ongoingTraining = false
  public exercises: Observable<any>
  public exerciseSub: Subscription

  constructor(private trainingService: TrainingService, private db: AngularFirestore) { }

  ngOnInit() {
    // this.exercises = this.trainingService.availableExercises
    this.exercises = this.db.collection('availableExercises').valueChanges()

    this.exerciseSub = this.trainingService.exerciseChanged.subscribe(ex => {
      this.ongoingTraining = !!ex
    })
  }

  ngOnDestroy() {
    this.trainingService.exerciseChanged.unsubscribe()
  }
}
