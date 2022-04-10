// angular
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// services
import { UserService } from '../../user.service';

@Component({
	templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
	get darkTheme() {
		return localStorage.getItem('theme') === 'dark';
	}
	userForm!: FormGroup;
	get f() {
		return this.userForm.controls;
	}
	constructor(
		private router: Router,
		private userService: UserService,
		private fb: FormBuilder
	) {}
	ngOnInit(): void {
		this.userForm = this.fb.group({
			first_name: ['', [Validators.required, Validators.maxLength(20)]],
			last_name: ['', [Validators.required, Validators.maxLength(20)]],
			email: [
				'',
				[
					Validators.required,
					Validators.email,
					Validators.maxLength(100),
				],
			],
			password: [
				'',
				[
					Validators.required,
					Validators.maxLength(20),
					Validators.minLength(4),
				],
			],
		});
	}
	register(): void {
		if (this.userForm.valid) {
			this.userService.registerUser(this.userForm.value).subscribe(x => {
				if (x.user) {
					this.router.navigate(['/login']);
				}
			});
		}
	}
}
