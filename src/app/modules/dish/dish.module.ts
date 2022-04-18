// angular
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
// ngrx
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '../shared/material.module';
// pipes
import { Capitalize } from '../shared/pipes/capitalize.pipe';
// shared modules
import { SharedModule } from '../shared/shared.module';
// components
import { AddDishComponent } from './components/add-dish/add-dish.component';
import { DishDetailComponent } from './components/dish-detail/dish-detail.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProfileDetailComponent } from './components/profile-detail/profile-detail.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DishRoutingModule } from './dish-routing.module';
import { DishEffect } from './dish.effect';
import { dishReducer } from './dish.reducer';

@NgModule({
	declarations: [
		MenuComponent,
		DishDetailComponent,
		AddDishComponent,
		Capitalize,
		ProfileComponent,
		ProfileDetailComponent,
		ProfileEditComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		MaterialModule,
		DishRoutingModule,
		ReactiveFormsModule,
		SharedModule,
		StoreModule.forFeature('dish', dishReducer),
		EffectsModule.forFeature([DishEffect]),
	],
})
export class DishModule {}
