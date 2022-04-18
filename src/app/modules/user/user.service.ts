// angular
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
// rxjs
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
// models
import { IUser } from './models/IUser';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	private userUrl = 'https://angular-restaurant-app.herokuapp.com/user';
	// private userUrl = 'http://localhost:5000/user';

	constructor(private http: HttpClient) {}

	getUsers(): Observable<IUser[]> {
		return this.http
			.get<IUser[]>(this.userUrl)
			.pipe(catchError(this.handleError));
	}

	getUser(id: string): Observable<{ user: IUser; error: string }> {
		return this.http
			.get<{ user: IUser; error: string }>(`${this.userUrl}/${id}`)
			.pipe(catchError(this.handleError));
	}

	registerUser(
		user: Partial<IUser>
	): Observable<{ user: IUser; error: string }> {
		return this.http
			.post<{ user: IUser; error: string }>(
				`${this.userUrl}/register`,
				user
			)
			.pipe(catchError(this.handleError));
	}

	loginUser(
		email: string,
		password: string
	): Observable<{ user: IUser; jwt: string; error: string }> {
		return this.http
			.post<{ user: IUser; jwt: string; error: string }>(
				`${this.userUrl}/login`,
				{ email, password }
			)
			.pipe(catchError(this.handleError));
	}

	updateUser(
		user: Partial<IUser>,
		userId: string
	): Observable<{ user: IUser; error: string }> {
		return this.http
			.put<{ user: IUser; error: string }>(`${this.userUrl}/${userId}`, {
				user,
			})
			.pipe(catchError(this.handleError));
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
