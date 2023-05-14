import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, map, of, forkJoin, toArray } from 'rxjs';

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

  // I believe some variation on this is the quickest way to get the results
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

  // If I'm understanding correctly, this is the proper way to get the results, likely due to the need to obfuscate the answers
  gradeEachQuestion(studentAnswers: string[], testIdentifier: string): Observable<boolean[]> {
    const results: Observable<boolean>[] = [];
    studentAnswers.forEach((answer, index) => {
      results.push(this.gradeQuestion(answer, testIdentifier, index + 1));
    });

    return forkJoin(results);
  }

  gradeQuestion(studentAnswer: string, testIdentifier: string, questionNumber: number): Observable<boolean> {
    if(!studentAnswer) {
      return of(false);
    }

    return this.client
      .get<boolean>(`${this.baseUrl}/tests/${testIdentifier}/questions/${questionNumber}/check?answer=${studentAnswer}`);
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