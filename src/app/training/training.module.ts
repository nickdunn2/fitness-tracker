import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FlexLayoutModule } from '@angular/flex-layout'
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { ReactiveFormsModule } from '@angular/forms'

import { CurrentTrainingComponent } from './current-training/current-training.component'
import { PastTrainingsComponent } from './past-trainings/past-trainings.component'
import { TrainingComponent } from './training.component'
import { NewTrainingComponent } from './new-training/new-training.component'
import { StopTrainingComponent } from './stop-training/stop-training.component'
import { MaterialModule } from '../material.module'

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    AngularFirestoreModule,
    ReactiveFormsModule
  ],
  entryComponents: [StopTrainingComponent]
})
export class TrainingModule {

}
