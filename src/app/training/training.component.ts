import { Component, OnDestroy, OnInit } from '@angular/core'
import { TrainingService } from './training.service'
import { Subscription } from 'rxjs/Subscription'
import { AngularFirestore } from 'angularfire2/firestore'
import { Observable } from 'rxjs/Observable'
import { Exercise } from './exercise.model'

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  public ongoingTraining = false
  public exercises: Observable<Exercise[]>
  public exerciseSub: Subscription

  constructor(private trainingService: TrainingService, private db: AngularFirestore) { }

  ngOnInit() {
    this.exercises = this.db
      .collection('availableExercises')
      .snapshotChanges()
      .map(resultsArray => {
        return resultsArray.map(res => {
          return {
            id: res.payload.doc.id,
            name: res.payload.doc.data().name,
            duration: res.payload.doc.data().duration,
            caloriesBurned: res.payload.doc.data().caloriesBurned
          }
        })
      })

    this.exerciseSub = this.trainingService.exerciseChanged.subscribe(ex => {
      this.ongoingTraining = !!ex
    })
  }

  ngOnDestroy() {
    this.trainingService.exerciseChanged.unsubscribe()
  }
}
