import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { IDish } from '../../model/IDish';
import {DishService} from '../../service/dish.service';

@Component({
  templateUrl: './dishdetail.component.html'
})
export class DishDetailComponent implements OnInit {
	pageTitle: string = 'Dish Detail';
	dish: IDish | undefined;
	errorMessage: string = '';
  constructor(private route: ActivatedRoute, private dishService: DishService,
  	private router:Router) {}

  ngOnInit(): void {
  	const id = Number(this.route.snapshot.paramMap.get('id'));
  	this.dishService.getDish(id).subscribe({
  		next: dish => this.dish = dish,
  		error: err => this.errorMessage = err
  	});
  }
  onBack():void {
  	this.router.navigate(['/menu'])
  }
}