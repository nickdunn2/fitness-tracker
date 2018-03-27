import { Component, Input, OnInit } from '@angular/core'
import { TrainingService } from '../training.service'
import { Exercise } from '../exercise.model'
import { FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  @Input() exercises: Exercise[] | undefined
  @Input() isLoading: boolean
  public exerciseForm = this.fb.group({
    'exercise': ['', [ Validators.required ]]
  })
  public get exercise() { return this.exerciseForm.get('exercise') }

  constructor(private trainingService: TrainingService, private fb: FormBuilder) { }

  ngOnInit() {
  }

  public startTraining() {
    this.trainingService.startExercise(this.exercise.value)
  }

  public fetchExercises() {
    this.trainingService.fetchAvailableExercises()
  }
}
