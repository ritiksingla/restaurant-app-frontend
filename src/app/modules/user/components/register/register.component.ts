import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../../user.service';
import {IUser} from '../../models/IUser';

@Component({
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	user: IUser = {
		first_name:'',
		last_name: '',
		email:'',
		password:''
	}
	constructor(private router:Router ,private userService: UserService) { }

	ngOnInit(): void { }
	onSubmit(f: NgForm): void {
		// using redux store here is not sensible
		this.userService.registerUser(this.user).subscribe(x => {
			if(x.user) {
				this.router.navigate(['/login']);
			}
		});
	}
}
