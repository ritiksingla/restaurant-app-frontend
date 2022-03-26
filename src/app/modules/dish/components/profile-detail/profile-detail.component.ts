// angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// angular redux
import { Store } from '@ngrx/store';
import * as DishReducer from '../../dish.reducer';

// rxjs
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// models
import { IUser } from '../../../user/models/IUser';
import { IComment } from '../../models/IComment';
import { IDish } from '../../models/IDish';

@Component({
  templateUrl: './profile-detail.component.html',
})
export class ProfileDetailComponent implements OnInit {
  currentUser!: IUser;
  dishes$!: Observable<IDish[]>;
  userDishes$!: Observable<IDish[]>;
  userComments$!: Observable<IComment[]>;

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
  ngOnInit(): void {
    this.dishes$ = this.store.select(DishReducer.getDishesState);
    this.userDishes$ = this.dishes$.pipe(
      map((dishes) =>
        dishes.filter((dish) => dish.user._id === this.currentUser._id)
      )
    );
    this.userComments$ = this.dishes$.pipe(
      map((dishes) =>
        dishes.map((dish) =>
          dish.comments.filter(
            (comment) => String(comment.author) === this.currentUser._id
          )
        )
      ),
      map((allComments) => {
        let comments: IComment[] = [];
        for (let i = 0; i < allComments.length; ++i) {
          if (allComments[i].length > 0) {
            comments.push(...allComments[i]);
          }
        }
        return comments;
      })
    );
  }
}
