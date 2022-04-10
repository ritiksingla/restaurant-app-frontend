// angular
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

// angular redux
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as DishAction from './dish.action';

// rxjs
import { of } from 'rxjs';
import { catchError, concatMap, map, tap } from 'rxjs/operators';

// services
import { DishService } from './dish.service';

/*
	- Higher order observables (Observable<Observable<?>>) 
	emit observable for each observable.
	- We need the nested subscribe operators which is not the best approach.
	- Thus we will use higher order maps to flatten higher order maps.
*/
/* Higher order map operators:
	1. concatMap:
		- Each observable must finish before emitting next, like relay race.
		- Items emitted are queued and are in order.
		- Use for single threaded operations!
	2. mergeMap:
		- All observables run in parallel and merged observables are in random order.
	3. switchMap:
		- Only one observable will be running at a time, unsubscribing previous ones.
		- Observables completed will be seen in the resulting flattened observables.
		- Use when want to stop prior observables before switching to new ones like
		  auto completion or selection from a list
*/
@Injectable()
export class DishEffect {
	constructor(
		private actions$: Actions,
		private dishService: DishService,
		private location: Location,
		private router: Router
	) {}

	loadDishes$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DishAction.loadDishes),
			concatMap(() =>
				this.dishService.dishes$.pipe(
					map(res => {
						alert('loadDishes');
						if (res.error.length > 0) {
							return DishAction.loadDishesError({
								error: res.error,
							});
						}
						return DishAction.loadDishesSuccess({
							dishes: res.dishes,
						});
					}),
					catchError(error =>
						of(DishAction.loadDishesError({ error }))
					)
				)
			)
		)
	);

	updateDish$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DishAction.updateDish),
			concatMap(action =>
				this.dishService.putDish(action._id, action.updatedDish).pipe(
					map(res => {
						if (res.error.length > 0) {
							return DishAction.updateDishError({
								error: res.error,
							});
						}
						return DishAction.updateDishSuccess({ dish: res.dish });
					}),
					tap(res => {
						if (res.type === '[Dish] update success') {
							this.location.back();
						}
					}),
					catchError(error =>
						of(DishAction.updateDishError({ error }))
					)
				)
			)
		)
	);

	addDish$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DishAction.addDish),
			concatMap(action =>
				this.dishService.postDish(action.newDish).pipe(
					map(res => {
						if (res.error.length > 0) {
							return DishAction.addDishError({
								error: res.error,
							});
						}
						return DishAction.addDishSuccess({ dish: res.dish });
					}),
					tap(res => {
						if (res.type === '[Dish] add success') {
							this.router.navigate(['menu']);
						}
					}),
					catchError(error => of(DishAction.addDishError({ error })))
				)
			)
		)
	);

	deleteDishes$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DishAction.deleteDish),
			concatMap(action =>
				this.dishService.deleteDish(action.id).pipe(
					map(res => {
						if (res.error.length > 0) {
							return DishAction.deleteDishError({
								error: res.error,
							});
						}
						return DishAction.deleteDishSuccess({ dish: res.dish });
					}),
					tap(res => {
						if (res.type === '[Dish] delete success') {
							this.router.navigate(['menu']);
						}
					}),
					catchError(error =>
						of(DishAction.deleteDishError({ error }))
					)
				)
			)
		)
	);
}
