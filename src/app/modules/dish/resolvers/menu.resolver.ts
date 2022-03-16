import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IDish } from '../model/IDish';
import {DishService} from '../service/dish.service';
import { State } from '../reducers/menu.reducer';
import * as MenuReducer from '../reducers/menu.reducer';

@Injectable({
	providedIn: 'root'
})
export class MenuResolver implements Resolve<IDish[]> {
	constructor(private store: Store<State>, private dishService: DishService) { }
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDish[]> {
		alert('in resolve');
		return this.store.select(MenuReducer.getDishesState);
	}
}