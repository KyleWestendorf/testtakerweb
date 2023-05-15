import { AsyncPipe, NgIf } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter } from 'rxjs';
import {
  TestingStateService,
} from 'src/app/services/testing-state/testing-state.service';
import { createChart } from '../../utilities/create-chart';

@UntilDestroy()
@Component({
  standalone: true,
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  imports: [NgIf, AsyncPipe],
})
export class ResultsComponent implements OnInit {
  @ViewChild('chart', { static: true, read: ElementRef })
  private chartContainer!: ElementRef;

  constructor(public testingState: TestingStateService) {}
 
  ngOnInit(): void {
    this.testingState.resultState$
      .pipe(filter((value) => !!value), untilDestroyed(this))
      .subscribe((value) => {
        createChart(value, this.chartContainer);
      });
  }
}
