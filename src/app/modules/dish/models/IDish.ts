import { IUser } from 'src/app/modules/user/models/IUser';
import { IComment } from './IComment';

export interface IDish {
	_id?: string;
	name: string;
	imageUrl: string;
	category: string;
	label: string;
	price: number;
	description: string;
	averageRating: number;
	user: IUser;
	comments: IComment[];
}