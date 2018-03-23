import { Exercise } from './exercise.model'
import { Subject } from 'rxjs/Subject'
import { Injectable } from '@angular/core'
import { AngularFirestore } from 'angularfire2/firestore'
import { Subscription } from 'rxjs/Subscription'

@Injectable()
export class TrainingService {
  public exerciseChanged = new Subject<Exercise>()
  public exercisesChanged = new Subject<Exercise[]>()
  public completedExercisesChanged = new Subject<Exercise[]>()
  private _availableExercises: Exercise[] = []
  private _currentExercise: Exercise
  private fbSubs: Subscription[] = []

  constructor(private db: AngularFirestore) {}

  public get availableExercises() {
    return this._availableExercises.slice()
  }

  public fetchAvailableExercises() {
    this.fbSubs.push(this.db
      .collection('availableExercises')
      .snapshotChanges()
      .map(results => {
        return results.map(res => {
          return {
            id: res.payload.doc.id,
            name: res.payload.doc.data().name,
            duration: res.payload.doc.data().duration,
            caloriesBurned: res.payload.doc.data().caloriesBurned
          }
        })
      })
      .subscribe((exercises: Exercise[]) => {
        this._availableExercises = exercises
        this.exercisesChanged.next([ ...this._availableExercises ])
      }))
  }

  public get currentExercise() {
    return { ...this._currentExercise }
  }

  public set currentExercise(val: Exercise) {
    this._currentExercise = val
  }

  public fetchCompletedExercises() {
    this.fbSubs.push(this.db
      .collection('completedExercises')
      .valueChanges()
      .subscribe((exercises: Exercise[]) => {
        this.completedExercisesChanged.next(exercises)
      }))
  }

  public startExercise(selectedId: string) {
    this.currentExercise = this.availableExercises.find(ex => ex.id === selectedId)
    this.exerciseChanged.next({ ...this.currentExercise })
  }

  public completeExercise() {
    this.storeExercise({
      ...this.currentExercise,
      date: new Date(),
      state: 'completed'
    })
    this.currentExercise = undefined
    this.exerciseChanged.next(undefined)
  }

  public cancelExercise(progress: number) {
    this.storeExercise({
      ...this.currentExercise,
      duration: this.currentExercise.duration * (progress / 100),
      caloriesBurned: this.currentExercise.caloriesBurned * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    })
    this.currentExercise = undefined
    this.exerciseChanged.next(undefined)
  }

  public cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe())
  }

  private storeExercise(exercise: Exercise) {
    this.db.collection('completedExercises').add(exercise)
  }
}
