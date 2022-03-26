// angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// ngrx
import { StoreModule } from '@ngrx/store';
import { DishEffect } from './dish.effect';
import { dishReducer } from './dish.reducer';
import { EffectsModule } from '@ngrx/effects';

// pipes
import { Capitalize } from '../shared/pipes/capitalize.pipe';

// shared modules
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material.module';
import { DishRoutingModule } from './dish-routing.module';

// components
import { AddDishComponent } from './components/add-dish/add-dish.component';
import { DishDetailComponent } from './components/dish-detail/dish-detail.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProfileDetailComponent } from './components/profile-detail/profile-detail.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { ProfileComponent } from './components/profile/profile.component';

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
    SharedModule,
    StoreModule.forFeature('dish', dishReducer),
    EffectsModule.forFeature([DishEffect]),
  ],
})
export class DishModule {}
