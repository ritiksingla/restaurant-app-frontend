import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StarComponent } from './star.component';

describe('Star Component', () => {
	let fixture: ComponentFixture<StarComponent>;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [StarComponent],
			schemas: [NO_ERRORS_SCHEMA],
		});
		fixture = TestBed.createComponent(StarComponent);
	});
	it('should render correct number of stars based on input', () => {
		const rating = 3.5;
		const expectedWidth = 75 * (rating / 5);

		fixture.componentInstance.rating = rating;
		fixture.componentInstance.ngOnChanges();
		fixture.detectChanges(); // bind elements and hook lifecycle OnInit()

		expect(fixture.componentInstance.starWidth).toEqual(expectedWidth);
		// expect(fixture.nativeElement.querySelector('.mask').style.width).toEqual(expectedWidth + 'px');
		const debugMask = fixture.debugElement.query(By.css('.mask'));
		expect(debugMask.nativeElement.style.width).toBe(expectedWidth + 'px');
	});
});
