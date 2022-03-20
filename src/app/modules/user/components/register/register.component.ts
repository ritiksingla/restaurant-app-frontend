import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../../user.service';
import {IUser} from '../../models/IUser';

@Component({
	templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
	user: IUser = {
		first_name:'',
		last_name: '',
		email:'',
		password:''
	}
	get darkTheme() {
		return localStorage.getItem('theme') === 'dark';
	}
	constructor(private router:Router ,private userService: UserService) { }

	ngOnInit(): void { }
	onSubmit(f: NgForm): void {
		// using redux store here is not sensible
		if (f.valid) {
			this.userService.registerUser(this.user).subscribe(x => {
				if(x.user) {
					this.router.navigate(['/login']);
				}
			});
		}
	}
}
