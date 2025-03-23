import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  //private apiUrl = 'http://localhost:5000/api/login'; // Replace with your backend URL

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/login`, { UserName: email, password }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      return throwError(() => new Error(error.error.message));
    } else {
      // Server-side error
      return throwError(() => new Error(`Error Code: ${error.status}\nMessage: ${error.message}`));
    }
  }
}