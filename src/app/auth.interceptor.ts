// angular
import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

// rxjs
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	token: string = '';
	constructor() {
		let token = localStorage.getItem('jwt');
		if (token !== null) {
			this.token = token;
		} else {
			this.token = '';
		}
	}
	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		return next.handle(
			req.clone({
				setHeaders: {
					'Content-Type': 'application/json',
					authorization: `bearer ${this.token}`,
				},
			})
		);
	}
}
