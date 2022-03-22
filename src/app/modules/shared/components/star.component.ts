import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
	selector: 'app-star',
	templateUrl: './star.component.html',
	styleUrls: ['./star.component.css']
})

export class StarComponent implements OnChanges {
	@Input() rating: number = 0;
	starWidth: number = 75;

	@Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();

	ngOnChanges(): void {
		this.starWidth = (75 / 5) * this.rating;
	}

	onClick(): void {
		this.ratingClicked.emit(`The rating ${this.rating} was clicked.`);
	}
}