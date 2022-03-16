// External and core modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// User defined modules
import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { DishModule } from './modules/dish/dish.module';

// ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {appReducer} from './app.state';

@NgModule({
	declarations: [
		AppComponent,
		WelcomeComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		RouterModule.forRoot([
			{ path: 'welcome', component: WelcomeComponent },
			{ path: '', redirectTo: 'welcome', pathMatch: 'full' },
			{ path: '**', redirectTo: 'welcome', pathMatch: 'full' }
		]),
		DishModule,
		StoreModule.forRoot({app: appReducer}),
		EffectsModule.forRoot([])
	],
	bootstrap: [AppComponent]
})
export class AppModule { }