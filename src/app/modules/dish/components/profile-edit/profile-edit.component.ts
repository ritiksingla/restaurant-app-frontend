// angular
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// angular redux
import { Store } from '@ngrx/store';
import * as DishReducer from '../../dish.reducer';

// models
import { IUser } from '../../../user/models/IUser';

@Component({
  templateUrl: './profile-edit.component.html',
})
export class ProfileEditComponent {
  currentUser!: IUser;
  get darkTheme(): boolean {
    return localStorage.getItem('theme') === 'dark';
  }
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<DishReducer.State>
  ) {
    let user = localStorage.getItem('user');
    if (user) {
      this.currentUser = JSON.parse(user);
    }
  }

  onSubmit(f: NgForm) {}
}
