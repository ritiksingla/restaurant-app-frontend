import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AddDishComponent } from './components/add-dish/add-dish.component';

@Injectable({
  providedIn: 'root',
})
export class DishGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return !!localStorage.getItem('jwt');
  }
}

@Injectable({
  providedIn: 'root',
})
export class DishEditGuard implements CanDeactivate<AddDishComponent> {
  canDeactivate(
    component: AddDishComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (component.isDirty) {
      return confirm(`Navigate away and lose all changes made?`);
    }
    return true;
  }
}
