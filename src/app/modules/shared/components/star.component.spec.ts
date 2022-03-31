import { StarComponent } from './star.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('Star Component', () => {
	let fixture: ComponentFixture<StarComponent>;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [StarComponent],
			schemas: [NO_ERRORS_SCHEMA]
		});
		fixture = TestBed.createComponent(StarComponent);
	});
	it('should render correct number of stars based on input', () => {
		let rating = 3.5;
		let expectedWidth = 75 * (rating / 5);

		fixture.componentInstance.rating = rating;
		fixture.componentInstance.ngOnChanges();
		fixture.detectChanges(); // bind elements and hook lifecycle OnInit()

		expect(fixture.componentInstance.starWidth).toEqual(expectedWidth);
		// expect(fixture.nativeElement.querySelector('.mask').style.width).toEqual(expectedWidth + 'px');
		let debugMask = fixture.debugElement.query(By.css('.mask'));
		expect(debugMask.nativeElement.style.width).toBe(expectedWidth + 'px');
	});
})