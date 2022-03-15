import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DishService } from '../service/dish.service';
import * as MenuAction from '../actions/menu.action';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap, concatMap } from 'rxjs/operators';

@Injectable()
export class DishEffect {
	constructor(private actions$: Actions, private dishService: DishService) { }
	loadDishes$ = createEffect(() => this.actions$.pipe(
		ofType(MenuAction.loadDishes),
		mergeMap(() => this.dishService.getDishes().pipe(
			map(dishes => {
				return MenuAction.loadDishesSuccess({ dishes });
			}),
			catchError(error => of(MenuAction.loadDishesError({ error })))
		))
	))

	updateDish$ = createEffect(() => this.actions$.pipe(
		ofType(MenuAction.updateDish),
		concatMap(action => this.dishService.putDish(action._id, action.updatedDish).pipe(
			map(dish => {
				return MenuAction.updateDishSuccess({ dish });
			}),
			catchError(error => of(MenuAction.updateDishError({ error })))
		))
	))

	addDish$ = createEffect(() => this.actions$.pipe(
		ofType(MenuAction.addDish),
		concatMap(action => this.dishService.postDish(action.newDish).pipe(
			map(dish => {
				return MenuAction.addDishSuccess({ dish });
			}),
			catchError(error => of(MenuAction.addDishError({ error })))
		))
	))

	deleteDishes$ = createEffect(() => this.actions$.pipe(
		ofType(MenuAction.deleteDish),
		mergeMap(action => this.dishService.deleteDish(action.id).pipe(
			map(dish => {
				return MenuAction.deleteDishSuccess({dish});
			}),
			catchError(error => of(MenuAction.deleteDishError({ error })))
		))
	))
}