import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material'
import { Exercise } from '../exercise.model'
import { TrainingService } from '../training.service'
import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {
  public displayedColumns = ['date', 'name', 'calories', 'duration', 'state']
  public dataSource = new MatTableDataSource<Exercise>()
  private completedExercisesSub: Subscription

  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.completedExercisesSub = this.trainingService.completedExercisesChanged.subscribe((exercises: Exercise[]) => {
      this.dataSource.data = exercises
    })
    this.trainingService.fetchCompletedExercises()
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
  }

  filter(val: string) {
    this.dataSource.filter = val.trim().toLowerCase()
  }

  ngOnDestroy() {
    this.completedExercisesSub.unsubscribe()
  }
}
