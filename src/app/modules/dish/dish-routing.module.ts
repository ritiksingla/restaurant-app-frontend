// angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { AddDishComponent } from './components/add-dish/add-dish.component';
import { DishDetailComponent } from './components/dish-detail/dish-detail.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProfileDetailComponent } from './components/profile-detail/profile-detail.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { ProfileComponent } from './components/profile/profile.component';

// guards
import { DishGuard, DishEditGuard } from './dish.guard';

const dishRoutes: Routes = [
	{
		path: 'menu',
		canActivate: [DishGuard],
		children: [
			{ path: '', component: MenuComponent },
			{
				path: 'add',
				canDeactivate: [DishEditGuard],
				component: AddDishComponent,
			},
			{ path: ':id', component: DishDetailComponent },
		],
	},
	{
		path: 'profile',
		canActivate: [DishGuard],
		component: ProfileComponent,
		children: [
			{ path: '', redirectTo: 'detail', pathMatch: 'full' },
			{ path: 'detail', component: ProfileDetailComponent },
			{ path: 'edit', component: ProfileEditComponent },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(dishRoutes)],
	exports: [RouterModule],
})
export class DishRoutingModule {}
