import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
// ngrx
import { StoreModule } from '@ngrx/store';
import { Capitalize } from '../shared/pipes/capitalize.pipe';
import { SharedModule } from '../shared/shared.module';
import { AddDishComponent } from './components/add-dish/add-dish.component';
import { DishDetailComponent } from './components/dish-detail/dish-detail.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProfileDetailComponent } from './components/profile-detail/profile-detail.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DishEffect } from './dish.effect';
import { DishGuard, DishEditGuard } from './dish.guard';
import { dishReducer } from './dish.reducer';



const dishRoutes: Routes = [{
	path: 'menu',
	canActivate: [DishGuard],
	children: [
		{ path: '', component: MenuComponent },
		{ path: 'add', canDeactivate: [DishEditGuard], component: AddDishComponent },
		{ path: ':id', component: DishDetailComponent }
	]
}, {
	path: 'profile',
	canActivate: [DishGuard],
	component: ProfileComponent,
	children: [
		{ path: '', redirectTo: 'detail', pathMatch: 'full' },
		{ path: 'detail', component: ProfileDetailComponent },
		{ path: 'edit', component: ProfileEditComponent }
	]
}
];

@NgModule({
	declarations: [
		MenuComponent,
		DishDetailComponent,
		AddDishComponent,
		Capitalize,
		ProfileComponent,
		ProfileDetailComponent,
		ProfileEditComponent
	],
	imports: [
		BrowserModule,
		RouterModule.forChild(dishRoutes),
		SharedModule,
		StoreModule.forFeature('dish', dishReducer),
		EffectsModule.forFeature([DishEffect])
	]
})
export class DishModule { }
