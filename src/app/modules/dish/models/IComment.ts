import { IUser } from '../../user/models/IUser';
import { IDish } from './IDish';

export interface IComment {
	_id: string;
	rating: number;
	content: string;
	createdAt: Date | string;
	author: IUser | string;
	dish: IDish | string;
}
export type ICommentWithoutAuthor = Omit<IComment, 'author'>;
export type ICommentWithoutAuthorAndDish = Omit<IComment, 'author' | 'dish'>;
export type ICommentWithoutDish = Omit<IComment, 'dish'>;

export type ICommentWithAuthor = ICommentWithoutAuthorAndDish & {
	author: IUser;
};
export type ICommentWithDish = ICommentWithoutAuthorAndDish & { dish: IDish };
export type ICommentWithAuthorAndDish = ICommentWithAuthor & { dish: IDish };
