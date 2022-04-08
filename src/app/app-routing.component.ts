// angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { WelcomeComponent } from './components/welcome/welcome.component';

const appRoutes: Routes = [
	{ path: 'welcome', component: WelcomeComponent },
	{ path: '', redirectTo: 'welcome', pathMatch: 'full' },
	{ path: '**', redirectTo: 'welcome', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
