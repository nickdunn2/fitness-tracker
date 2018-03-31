import { NgModule } from '@angular/core'
import { AngularFirestoreModule } from 'angularfire2/firestore'

import { CurrentTrainingComponent } from './current-training/current-training.component'
import { PastTrainingsComponent } from './past-trainings/past-trainings.component'
import { TrainingComponent } from './training.component'
import { NewTrainingComponent } from './new-training/new-training.component'
import { StopTrainingComponent } from './stop-training/stop-training.component'
import { SharedModule } from '../shared/shared.module'
import { TrainingRoutingModule } from './training-routing.module'

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent
  ],
  imports: [
    SharedModule,
    AngularFirestoreModule,
    TrainingRoutingModule
  ],
  entryComponents: [StopTrainingComponent]
})
export class TrainingModule {

}
