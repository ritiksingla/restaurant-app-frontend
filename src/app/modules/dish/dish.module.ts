import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenuComponent } from './components/menu/menu.component';
import { DishDetailComponent } from './components/dishdetail/dishdetail.component';
import { DishDetailGuard } from './guards/dish-detail.guard';
import { AddDishComponent } from './components/add-dish/add-dish.component';
import { Capitalize } from '../shared/pipes/capitalize.pipe';
import { SharedModule } from '../shared/shared.module';

// ngrx
import { StoreModule } from '@ngrx/store';
import { menuReducer } from './reducers/menu.reducer';
import { EffectsModule } from '@ngrx/effects';
import { DishEffect } from './effects/dish.effect';

const dishRoutes: Routes = [
	{ path: 'menu', component: MenuComponent },
	{ path: 'menu/add', component: AddDishComponent },
	{ path: 'menu/:id', canActivate: [DishDetailGuard], component: DishDetailComponent }
];

@NgModule({
	declarations: [
		MenuComponent,
		DishDetailComponent,
		AddDishComponent,
		Capitalize
	],
	imports: [
		RouterModule.forChild(dishRoutes),
		SharedModule,
		StoreModule.forFeature('menu', menuReducer),
		EffectsModule.forFeature([DishEffect])
	]
})
export class DishModule { }
