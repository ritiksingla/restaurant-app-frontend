// angular
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// ngrx
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UserEffect } from './user.effect';
import { userReducer } from './user.reducer';

// shared modules
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material.module';
import { UserRoutingModule } from './user-routing.module';

// components
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    UserRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    StoreModule.forFeature('user', userReducer),
    EffectsModule.forFeature([UserEffect]),
  ],
})
export class UserModule {}
