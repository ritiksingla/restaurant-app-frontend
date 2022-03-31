// angular
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// angular redux
import { Store } from '@ngrx/store';
import * as DishActions from '../../dish.action';
import * as DishReducer from '../../dish.reducer';

// rxjs
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// models
import { IUser } from '../../../user/models/IUser';
import { IComment } from '../../models/IComment';
import { IDish } from '../../models/IDish';

// services
import { UserService } from '../../../user/user.service';
import { DishService } from '../../dish.service';

@Component({
  templateUrl: './dish-detail.component.html',
})
export class DishDetailComponent implements OnInit {
  pageTitle: string = 'Dish Detail';
  dish$!: Observable<IDish>;
  users$!: Observable<IUser[]>;
  dishCommentsWithAuthors$!: Observable<IDish>;
  currentUser!: IUser;
  comment_content = '';
  comment_rating = 1;
  get darkTheme(): boolean {
    return localStorage.getItem('theme') === 'dark';
  }

  constructor(
    private location: Location,
    private dishService: DishService,
    private router: Router,
    private store: Store<DishReducer.State>,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {
    let user = localStorage.getItem('user');
    if (user) {
      this.currentUser = JSON.parse(user);
    }
  }

  ngOnInit(): void {
    const id: string = String(this.activatedRoute.snapshot.paramMap.get('id'));
    this.dish$ = this.dishService.getDish(id);
    this.users$ = this.userService.getUsers();
    this.dishCommentsWithAuthors$ = combineLatest([
      this.dish$,
      this.users$,
    ]).pipe(
      map(([dish, users]) => {
        dish.comments = dish.comments.map((comment) => {
          let author = users.find((u) => u._id == String(comment.author));
          return {
            ...comment,
            author: author,
          } as IComment;
        });
        return dish;
      })
    );
  }
  onBack(): void {
    // make another request instead of actual back
    // this.router.navigate(['/menu'])
    this.location.back();
  }
  onDelete(id?: string): void {
    this.store.dispatch(DishActions.deleteDish({ id: String(id) }));
    this.router.navigate(['/menu']);
  }
  onEdit(editDish: IDish): void {
    this.router.navigate(['/menu/add'], { queryParams: editDish });
  }
  addComment(dish: IDish): void {
    if (this.comment_content.length > 0 && dish._id) {
      this.dishService
        .postComment(
          dish._id,
          String(this.currentUser._id),
          this.comment_content,
          this.comment_rating
        )
        .subscribe((_) => window.location.reload());
    }
  }

  onEditComment(comment: IComment) {}

  onDeleteComment(comment: IComment) {
    this.dishService
      .deleteComment(String(comment._id))
      .subscribe((_) => window.location.reload());
  }
}
