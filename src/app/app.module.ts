// External and core modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// User defined modules and components
import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { DishModule } from './modules/dish/dish.module';
import { UserModule } from './modules/user/user.module';

// middlewares
import {AuthInterceptor} from './auth.interceptor';

// ngrx/store
import { StoreModule } from '@ngrx/store';
import {appReducer} from './app.state';

// ngrx/effects
import { EffectsModule } from '@ngrx/effects';

@NgModule({
	declarations: [
		AppComponent,
		WelcomeComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		DishModule,
		UserModule,
		RouterModule.forRoot([
			{ path: 'welcome', component: WelcomeComponent },
			{ path: '', redirectTo: 'welcome', pathMatch: 'full' },
			{ path: '**', redirectTo: 'welcome', pathMatch: 'full' }
		]),
		StoreModule.forRoot({app: appReducer}),
		EffectsModule.forRoot([])
	],
	providers:[{
		provide: HTTP_INTERCEPTORS,
		useClass: AuthInterceptor,
		multi: true
	}],
	bootstrap: [AppComponent]
})
export class AppModule { }