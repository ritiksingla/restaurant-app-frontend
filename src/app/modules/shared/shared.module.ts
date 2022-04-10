import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StarComponent } from './components/star/star.component';
// import { SnackBarComponent } from './components/snackbar/snackbar.component';

@NgModule({
	declarations: [StarComponent],
	imports: [CommonModule],
	exports: [CommonModule, StarComponent],
})
export class SharedModule {}
