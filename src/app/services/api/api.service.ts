import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'https://gh07niegi4.execute-api.us-east-1.amazonaws.com/default';
  constructor(private client: HttpClient) { }

  getQuestions(): Observable<Question[]> {
    return this.client.get<Question[]>('../../assets/questions.json').pipe(catchError((error) => {
      console.error('Error loading questions:', error);
      return throwError(() => new Error('Failed to load questions. Please try again later.'));
    }))
  }

  gradeQuestions(studentAnswers: string[], testIdentifier: string): Observable<boolean[]> {
    return this.client
      .get<TestAnswers[]>(`${this.baseUrl}/tests/${testIdentifier}/answers`)
      .pipe(
        map(testAnswers =>
          testAnswers.map((answer, index) => {
            let studentAnswer = studentAnswers[index];
            if(studentAnswer === null) {
              return false;
            }
            return answer.correctResponse.toLowerCase() === studentAnswer.toLowerCase();
          })
        )
      );
  }

  gradeQuestion(studentAnswer: string, testIdentifier: string, questionNumber: number): Observable<boolean> {
    return this.client
      .get<TestAnswers[]>(`${this.baseUrl}/tests/${testIdentifier}/question/${questionNumber}/check?answer=${studentAnswer}`)
      .pipe(
        map(testAnswers => {
          let answer = testAnswers[questionNumber];
          if(studentAnswer === null) {
            return false;
          }
          return answer.correctResponse.toLowerCase() === studentAnswer.toLowerCase();
        })
      );
  }
}

export interface Question {
  question: string;
  options: Record<string, string>
}

export interface TestAnswers {
  question: string,
  correctResponse: string
}