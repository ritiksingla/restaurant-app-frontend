import {Injectable} from '@angular/core';
import {IDish} from '../model/IDish';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';

@Injectable({
	providedIn:'root'
})
export class DishService {
	private dishUrl = 'assets/api/dishes.json';

	// dependency injection for HttpClient
	constructor(private http: HttpClient) {}

	// Observable is like a stream in java
	getDishes():Observable<IDish[]> {
		return this.http.get<IDish[]>(this.dishUrl).pipe(
			tap(data=>console.log('All: ', JSON.stringify(data))),
			catchError(this.handleError)
			);
	}

	getDish(id: number):Observable<IDish|undefined> {
		return this.getDishes().pipe(
			map((dishes:IDish[]) => dishes.find(d => d.id === id))
		);
	}
	private handleError(err: HttpErrorResponse) {
		let errorMessage = '';
		if (err.error instanceof ErrorEvent)
			errorMessage = `An error occured: ${err.error.message}`;
		else
			errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
		console.log(errorMessage);
		return throwError(errorMessage);
	}
}