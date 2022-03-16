import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import { Store } from '@ngrx/store';
import { IDish } from '../model/IDish';
import { State } from '../reducers/menu.reducer';
import * as MenuReducer from '../reducers/menu.reducer';

@Injectable({
	providedIn: 'root'
})
export class DishResolver implements Resolve<IDish> {
	constructor(private store: Store<State>) {}
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<IDish> {
		// const id:string = String(route.paramMap.get('id'));
		return this.store.select(MenuReducer.getSelectedDishState);
	}
}