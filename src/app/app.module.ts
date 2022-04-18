// angular
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// angular redux
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.component';
// components
import { AppComponent } from './app.component';
// middlewares
import { AuthInterceptor } from './auth.interceptor';
import { WelcomeComponent } from './components/welcome/welcome.component';
// shared modules
import { DishModule } from './modules/dish/dish.module';
import { MaterialModule } from './modules/shared/material.module';
import { UserModule } from './modules/user/user.module';

@NgModule({
	declarations: [AppComponent, WelcomeComponent],
	imports: [
		BrowserModule,
		HttpClientModule,
		DishModule,
		UserModule,
		BrowserAnimationsModule,
		MaterialModule,
		AppRoutingModule,
		StoreModule.forRoot({}),
		EffectsModule.forRoot([]),
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
