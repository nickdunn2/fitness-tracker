import { Exercise } from './exercise.model'
import { Subject } from 'rxjs/Subject'

export class TrainingService {
  public exerciseChanged = new Subject<Exercise>()
  private _availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, caloriesBurned: 8 },
    { id: 'mountain-climbers', name: 'Mountain Climbers', duration: 180, caloriesBurned: 15 },
    { id: 'pull-ups', name: 'Pull-ups', duration: 120, caloriesBurned: 18 },
    { id: 'push-ups', name: 'Push-ups', duration: 90, caloriesBurned: 32 },
    { id: 'burpees', name: 'Burpees', duration: 60, caloriesBurned: 8 }
  ]
  private _completedExercises: Exercise[] = []
  private _currentExercise: Exercise

  public get availableExercises() {
    return this._availableExercises.slice()
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
    this._completedExercises.push({
      ...this.currentExercise,
      date: new Date(),
      state: 'completed'
    })
    this.currentExercise = undefined
    this.exerciseChanged.next(undefined)
  }

  public cancelExercise(progress: number) {
    this._completedExercises.push({
      ...this.currentExercise,
      duration: this.currentExercise.duration * (progress / 100),
      caloriesBurned: this.currentExercise.caloriesBurned * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    })
    this.currentExercise = undefined
    this.exerciseChanged.next(undefined)
  }
}
