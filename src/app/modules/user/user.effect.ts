import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from './user.service';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap, switchMap } from 'rxjs/operators';
import * as AppAction from './user.action';
import {Router} from '@angular/router';

@Injectable()
export class UserEffect {
	constructor(private actions$: Actions, private userService: UserService, private router: Router) { }
	
	loginUser$ = createEffect(() => this.actions$.pipe(
		ofType(AppAction.loginUser),
		switchMap(action => this.userService.loginUser(action.email, action.password).pipe(
			map(res => {
				if(res.error.length > 0) {
					alert(res.error);
					return AppAction.loginUserError({error: res.error});
				} else {
					localStorage.setItem('user', JSON.stringify(res.user));
					localStorage.setItem('jwt', res.jwt);
					return AppAction.loginUserSuccess({ user: res.user, jwt: res.jwt });	
				}
			}),
			tap(() => this.router.navigateByUrl('menu')),
			catchError(error => of(AppAction.loginUserError({ error })))
		))
	));
}