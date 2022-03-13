import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

import { IDish } from '../../model/IDish';
import {DishService} from '../../service/dish.service';

@Component({
  templateUrl: './menu.component.html'
})

export class MenuComponent implements OnInit, OnDestroy {
  	dishes: IDish[] = [];
  	filteredDishes: IDish[] = [];
	errorMessage: string = '';
	sub!: Subscription; // will be initialized before use
	
  	private _listFilter : string = '';

  	get listFilter(): string {
  		return this._listFilter;
  	}
  	set listFilter(value : string) {
  		this._listFilter = value;
  		this.filteredDishes = this.performFilter(value);
  	}

  	constructor(private dishService : DishService, private router: Router) {}

  	ngOnInit() : void {
  		this.sub = this.dishService.getDishes().subscribe({
  			next: dishes=> {
  				this.dishes = dishes;
  				this.filteredDishes = this.dishes;
  			},
  			error: err => this.errorMessage = err
  		});
  	}

  	ngOnChanges() : void {

  	}

  	ngOnDestroy(): void {
  		this.sub.unsubscribe();
  	}

  	performFilter(value : string) : IDish[] {
  		return this.dishes.filter(d => {
  			return d.name.toLowerCase().includes(value.toLowerCase());
  		});
  	}

  	onRatingClicked(message: string): void {
  		console.log(message);
  	}

  	onDishClicked(idx?:string): void {
  		this.router.navigate(['/menu', String(idx)]);
  	}
}
