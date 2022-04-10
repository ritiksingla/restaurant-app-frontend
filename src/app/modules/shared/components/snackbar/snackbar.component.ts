import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class SnackBarComponent {
	constructor(public _snackBar: MatSnackBar) {}
	openSnackBar(message: string) {
		this._snackBar.open(message, undefined, {
			duration: 3000,
		});
	}
}
