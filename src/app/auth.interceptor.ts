// angular
import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
// rxjs
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
// shared
import { SnackBarComponent } from './modules/shared/components/snackbar/snackbar.component';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	token = '';
	constructor(private snackBar: SnackBarComponent) {
		const token = localStorage.getItem('jwt');
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
		return next
			.handle(
				req.clone({
					setHeaders: {
						'Content-Type': 'application/json',
						authorization: `bearer ${this.token}`,
					},
				})
			)
			.pipe(
				tap(event => {
					if (event instanceof HttpResponse) {
						if (event.body.error && event.body.error.length > 0) {
							this.snackBar.openSnackBar(event.body.error);
						}
					}
				})
			);
	}
}
