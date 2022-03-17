import { IComment } from './IComment';
import { IUser } from 'src/app/modules/user/models/IUser';

export interface IDish {
	readonly _id?: string;
	name: string;
	imageUrl: string;
	category: string;
	label: string;
	price: number;
	description: string;
	starRating: number;
	user: IUser;
	comments?: IComment[];
}