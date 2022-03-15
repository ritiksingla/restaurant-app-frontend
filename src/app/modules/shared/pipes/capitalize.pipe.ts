import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'capitalize'
})

export class Capitalize implements PipeTransform {
	transform(value: string): string {
		return value.split(' ').map(e => e.toLowerCase()).map(e => e[0].toUpperCase() + e.substr(1)).join(' ');
	}
}