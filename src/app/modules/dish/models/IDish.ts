import { IUser } from '../../user/models/IUser';
import { IComment, ICommentWithAuthor } from './IComment';

export interface IDish {
	_id: string;
	name: string;
	imageUrl: string;
	category: string;
	label: string;
	price: number;
	description: string;
	averageRating: number;
	user: IUser | string;
	comments: IComment[] | string[];
}

export type IDishWithoutUserAndComments = Omit<IDish, 'comments' | 'user'>;
export type IDishWithComments = IDishWithoutUserAndComments & {
	comments: IComment[];
};
export type IDishWithUser = IDishWithoutUserAndComments & { user: IUser };
export type IDishWithUserAndComments = IDishWithUser & { comments: IComment[] };
export type IDishWithUserAndCommentsAndAuthor = IDishWithUser & {
	comments: ICommentWithAuthor[];
};
