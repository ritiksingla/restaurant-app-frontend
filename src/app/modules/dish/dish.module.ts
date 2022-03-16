import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenuComponent } from './components/menu/menu.component';
import { DishDetailComponent } from './components/dish-detail/dish-detail.component';
import { DishDetailGuard } from './guards/dish-detail.guard';
import { AddDishComponent } from './components/add-dish/add-dish.component';
import { Capitalize } from '../shared/pipes/capitalize.pipe';
import { SharedModule } from '../shared/shared.module';
import { DishResolver } from './resolvers/dish.resolver';
import { MenuResolver } from './resolvers/menu.resolver';

// ngrx
import { StoreModule, Store } from '@ngrx/store';
import { menuReducer } from './reducers/menu.reducer';
import { EffectsModule } from '@ngrx/effects';
import { DishEffect } from './effects/dish.effect';

const dishRoutes: Routes = [
	{
		path: 'menu',
		component: MenuComponent
		// resolve: { dishes: MenuResolver }
	},
	{ path: 'menu/add', component: AddDishComponent },
	{
		path: 'menu/:id',
		canActivate: [DishDetailGuard],
		component: DishDetailComponent
	}
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
export class DishModule {}
