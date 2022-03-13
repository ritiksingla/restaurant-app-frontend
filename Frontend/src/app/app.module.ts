import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { DishDetailComponent } from './components/dishdetail/dishdetail.component';
import {StarComponent} from './shared/components/star.component';
import { Capitalize } from './shared/pipes/capitalize.pipe';
import {DishDetailGuard} from './guards/dish-detail.guard';
import { AddDishComponent } from './components/add-dish/add-dish.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishDetailComponent,
    StarComponent,
    Capitalize,
    AddDishComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
    	{path: 'menu', component: MenuComponent},
    	{path: 'menu/add', component: AddDishComponent},
    	{path: 'menu/:id', canActivate: [DishDetailGuard], component: DishDetailComponent},
    	{path: '', redirectTo: 'menu', pathMatch: 'full'},
    	{path: '**', redirectTo: 'menu', pathMatch: 'full'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }