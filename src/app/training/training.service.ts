import { Exercise } from './exercise.model'
import { Subject } from 'rxjs/Subject'
import { Injectable } from '@angular/core'
import { AngularFirestore } from 'angularfire2/firestore'

@Injectable()
export class TrainingService {
  public exerciseChanged = new Subject<Exercise>()
  public exercisesChanged = new Subject<Exercise[]>()
  private _availableExercises: Exercise[] = []
  private _completedExercises: Exercise[] = []
  private _currentExercise: Exercise

  constructor(private db: AngularFirestore) {}

  // TODO: Fix this
  public get availableExercises() {
    // return this._availableExercises.slice()
    return []
  }

  public fetchAvailableExercises() {
    this.db
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
      })
  }

  public get currentExercise() {
    return { ...this._currentExercise }
  }

  public set currentExercise(val: Exercise) {
    this._currentExercise = val
  }

  public get completedExercises() {
    return this._completedExercises.slice()
  }

  public startExercise(selectedId: string) {
    this.currentExercise = this.availableExercises.find(ex => ex.id === selectedId)
    this.exerciseChanged.next({ ...this.currentExercise })
  }

  public completeExercise() {
    this.addDataToDatabase({
      ...this.currentExercise,
      date: new Date(),
      state: 'completed'
    })
    this.currentExercise = undefined
    this.exerciseChanged.next(undefined)
  }

  public cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.currentExercise,
      duration: this.currentExercise.duration * (progress / 100),
      caloriesBurned: this.currentExercise.caloriesBurned * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    })
    this.currentExercise = undefined
    this.exerciseChanged.next(undefined)
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('completedExercises').add(exercise)
  }
}
