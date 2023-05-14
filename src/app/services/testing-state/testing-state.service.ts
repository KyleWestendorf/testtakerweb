import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, tap } from 'rxjs';

// Generally I would use NGRX for state, but this is an example
@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class TestingStateService {
  quizState$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  resultState$: BehaviorSubject<boolean[]> = new BehaviorSubject<boolean[]>([]);
  constructor() {
    this.quizState$.pipe(tap(console.log), untilDestroyed(this)).subscribe();
    this.resultState$.pipe(tap(console.log), untilDestroyed(this)).subscribe();
  }

  set quizState(state: any) {
    this.quizState$.next(state);
  }

  get quizState(): any {
    return this.quizState$.getValue();
  }

  set resultState(state: any) {
    this.resultState$.next(state);
  }

  get resultState(): boolean[] {
    return this.resultState$.getValue();
  }
}
