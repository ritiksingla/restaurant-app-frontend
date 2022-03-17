import { Injectable } from '@angular/core';
import { IDish } from '../model/IDish';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class DishService {
	// private dishUrl = 'https://angular-restaurant-app.herokuapp.com/dish';
	private dishUrl = 'http://localhost:5000/dish';

	// dependency injection for HttpClient
	constructor(private http: HttpClient) { }

	// Observable is like a stream in java
	getDishes(): Observable<IDish[]> {
		alert('getting dishes');
		return this.http.get<IDish[]>(this.dishUrl).pipe(catchError(this.handleError));
	}

	getDish(id: string): Observable<IDish> {
		return this.http.get<IDish>(`${this.dishUrl}/${id}`).pipe(catchError(this.handleError));
	}

	postDish(dish: IDish): Observable<IDish> {
		return this.http.post<IDish>(this.dishUrl, dish).pipe(catchError(this.handleError));
	}

	deleteDish(id: string): Observable<IDish> {
		return this.http.delete<IDish>(`${this.dishUrl}/${id}`).pipe(catchError(this.handleError));
	}
	putDish(id: string, dish: IDish): Observable<IDish> {
		return this.http.put<IDish>(`${this.dishUrl}/${id}`, dish).pipe(catchError(this.handleError));
	}

	private handleError(err: HttpErrorResponse) {
		let errorMessage = '';
		if (err.error instanceof ErrorEvent)
			errorMessage = `An error occured: ${err.error.message}`;
		else
			errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
		alert(errorMessage);
		return throwError(errorMessage);
	}
}