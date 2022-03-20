import { Injectable } from '@angular/core';
import { IDish } from './models/IDish';
import {IUser} from '../user/models/IUser';
import {IComment} from './models/IComment';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map, shareReplay } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class DishService {
	private dishUrl = 'https://angular-restaurant-app.herokuapp.com/dish';
	// private dishUrl = 'http://localhost:5000/dish';
	categories$ = this.http.get<string[]>(`${this.dishUrl}/categories`).pipe(
		shareReplay(1),
		catchError(this.handleError)
	);
	labels$ = this.http.get<string[]>(`${this.dishUrl}/labels`).pipe(
		shareReplay(1),
		catchError(this.handleError)
	);

	dishes$ = this.http.get<{dishes:IDish[], error: string}>(this.dishUrl).pipe(
		shareReplay(1),
		catchError(this.handleError)
	);
	constructor(private http: HttpClient) { }

	getDish(id: string): Observable<IDish> {
		return this.http.get<IDish>(`${this.dishUrl}/${id}`).pipe(catchError(this.handleError));
	}

	postDish(dish: IDish): Observable<{ dish: IDish, error: string }> {
		return this.http.post<{ dish: IDish, error: string }>(this.dishUrl, dish).pipe(catchError(this.handleError));
	}

	deleteDish(id: string): Observable<{ dish: IDish, error: string }> {
		return this.http.delete<{ dish: IDish, error: string }>(`${this.dishUrl}/${id}`).pipe(catchError(this.handleError));
	}
	putDish(id: string, dish: IDish): Observable<{ dish: IDish, error: string }> {
		return this.http.put<{ dish: IDish, error: string }>(`${this.dishUrl}/${id}`, dish).pipe(catchError(this.handleError));
	}

	postComment(dishId: string, userId:string, content:String, rating:number):Observable<{ comment: IComment, error: string}> {
		return this.http.post<{ comment: IComment, error: string }>(`${this.dishUrl}/${dishId}/comment`, {userId, rating, content}).pipe(catchError(this.handleError));
	}
	deleteComment(dishId: string):Observable<{ comment: IComment, error: string}> {
		return this.http.delete<{ comment: IComment, error: string }>(`${this.dishUrl}/${dishId}/comment`).pipe(catchError(this.handleError));
	}

	private handleError(err: HttpErrorResponse) {
		let errorMessage = '';
		if (err.error instanceof ErrorEvent)
			errorMessage = `An error occured: ${err.error.message}`;
		else
			errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
		return throwError(errorMessage);
	}
}