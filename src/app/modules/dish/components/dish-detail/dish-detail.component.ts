// angular
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// angular redux
import { Store } from '@ngrx/store';
import * as DishActions from '../../dish.action';
import * as DishReducer from '../../dish.reducer';

// rxjs
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// models
import { IUser } from '../../../user/models/IUser';
import { ICommentWithAuthor } from '../../models/IComment';
import {
	IDishWithUserAndComments,
	IDishWithUserAndCommentsAndAuthor,
} from '../../models/IDish';

// services
import { UserService } from '../../../user/user.service';
import { DishService } from '../../dish.service';

@Component({
	templateUrl: './dish-detail.component.html',
})
export class DishDetailComponent implements OnInit {
	pageTitle: string = 'Dish Detail';
	dish$!: Observable<IDishWithUserAndComments>;
	users$!: Observable<IUser[]>;

	dishCommentsWithAuthors$!: Observable<IDishWithUserAndCommentsAndAuthor>;
	currentUser!: IUser;
	commentForm!: FormGroup;
	get f() {
		return this.commentForm.controls;
	}
	get darkTheme(): boolean {
		return localStorage.getItem('theme') === 'dark';
	}

	constructor(
		private location: Location,
		private dishService: DishService,
		private router: Router,
		private store: Store<DishReducer.State>,
		private activatedRoute: ActivatedRoute,
		private userService: UserService,
		private fb: FormBuilder
	) {
		let user = localStorage.getItem('user');
		if (user) {
			this.currentUser = JSON.parse(user);
		}
	}

	ngOnInit(): void {
		const id: string = String(
			this.activatedRoute.snapshot.paramMap.get('id')
		);
		this.dish$ = this.dishService.getDish(id);
		this.users$ = this.userService.getUsers();
		this.dishCommentsWithAuthors$ = combineLatest([
			this.dish$,
			this.users$,
		]).pipe(
			map(([dish, users]) => {
				let comments = dish.comments.map(comment => {
					let author = users.find(
						u => u._id == String(comment.author)
					);
					return {
						...comment,
						author: author,
					} as ICommentWithAuthor;
				});
				return {
					...dish,
					comments: comments,
				} as IDishWithUserAndCommentsAndAuthor;
			})
		);

		this.commentForm = this.fb.group({
			content: ['', [Validators.required, Validators.maxLength(100)]],
			rating: [
				1,
				[Validators.required, Validators.min(1), Validators.max(5)],
			],
		});
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
	onEdit(editDish: IDishWithUserAndCommentsAndAuthor): void {
		this.router.navigate(['/menu/add'], { queryParams: editDish });
	}
	addComment(currentDish: IDishWithUserAndCommentsAndAuthor): void {
		if (this.commentForm.valid) {
			this.dishService
				.postComment(
					currentDish._id,
					String(this.currentUser._id),
					this.f.content.value,
					this.f.rating.value
				)
				.subscribe(_ => window.location.reload());
		}
	}

	onEditComment(comment: ICommentWithAuthor) {}

	onDeleteComment(comment: ICommentWithAuthor) {
		this.dishService
			.deleteComment(String(comment._id))
			.subscribe(_ => window.location.reload());
	}
}
