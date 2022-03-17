import { Injectable, OnInit } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	token: string='';
	constructor() {
		let token = localStorage.getItem('jwt');
		if(token !== null) {
			this.token = token;
		} else {
			this.token = '';
		}
	}
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req.clone({
			setHeaders: {
				'Content-Type': 'application/json',
				'authorization': `bearer ${this.token}`
			}
		}));
	}
}