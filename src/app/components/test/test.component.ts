import { AsyncPipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ApiService, Question } from 'src/app/services/api/api.service';
import { TestingStateService } from 'src/app/services/testing-state/testing-state.service';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ResultsComponent } from '../results/results.component';

@UntilDestroy()
@Component({
  standalone: true,
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  imports: [ReactiveFormsModule, NgFor, MatCardModule, MatButtonModule, MatRadioModule, ResultsComponent, AsyncPipe],
  providers: [ApiService]
})
export class TestComponent implements OnInit {
  questions: Question[] = [];
  quizForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, public state: TestingStateService) {
    this.quizForm = this.formBuilder.group({
      questionsArray: new FormArray([])
    });
  }

  ngOnInit(): void {
    this.apiService.getQuestions().pipe(untilDestroyed(this)).subscribe((questions: Question[]) => {
      this.questions = questions;
      const questionsArray = this.quizForm.get('questionsArray') as FormArray;
      questions.forEach(() => {
        questionsArray.push(new FormControl(''))
      });
    });

    this.quizForm.valueChanges.pipe(untilDestroyed(this)).subscribe(value => {
      this.state.quizState = value.questionsArray;
    });
  }

  onSubmit(): void {
    console.log(this.quizForm.value);
    this.apiService.gradeEachQuestion(this.quizForm.value.questionsArray, 'abc').subscribe(results => { this.state.resultState = results });
    
    // this.apiService.gradeQuestions(this.quizForm.value.questionsArray, 'abc').subscribe(results => {
    //   this.state.resultState = results;
    // });
  }
}
