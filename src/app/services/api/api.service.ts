import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private client: HttpClient) { }

  getQuestions(): Observable<Question[]> {
    return this.client.get<Question[]>('../../assets/questions.json').pipe(catchError((error) => {
      console.error('Error loading questions:', error);
      return throwError(() => new Error('Failed to load questions. Please try again later.'));
    }))
  }
}

export interface Question {
  question: string;
  options: Record<string, string>
}
