// angular
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// angular redux
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { loadDishes } from '../dish/dish.action';
import { State } from '../dish/dish.reducer';
import * as AppAction from './user.action';

// rxjs
import { of } from 'rxjs';
import { catchError, concatMap, map, tap } from 'rxjs/operators';

// services
import { UserService } from './user.service';

@Injectable()
export class UserEffect {
  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private userService: UserService,
    private router: Router
  ) {}

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppAction.loginUser),
      concatMap((action) =>
        this.userService.loginUser(action.email, action.password).pipe(
          map((res) => {
            if (res.error.length > 0) {
              return AppAction.loginUserError({ error: res.error });
            } else {
              localStorage.setItem('user', JSON.stringify(res.user));
              localStorage.setItem('jwt', res.jwt);
              return AppAction.loginUserSuccess({
                user: res.user,
                jwt: res.jwt,
              });
            }
          }),
          tap(() => {
            this.store.dispatch(loadDishes());
            this.router.navigateByUrl('menu');
          }),
          catchError((error) => of(AppAction.loginUserError({ error })))
        )
      )
    )
  );
}
