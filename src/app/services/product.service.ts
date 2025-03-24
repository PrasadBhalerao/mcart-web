// product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.apiUrl;
  //private apiUrl = 'http://localhost:5000/api/product'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/api/product`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    if (error.error instanceof ErrorEvent) {
      return throwError(() => new Error(error.error.message));
    } else {
      return throwError(() => new Error(`Error Code: ${error.status}\nMessage: ${error.message}`));
    }
  }
}