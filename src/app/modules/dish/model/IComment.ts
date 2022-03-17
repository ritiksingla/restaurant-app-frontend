import { IUser } from 'src/app/modules/user/models/IUser';

export interface IComment {
	readonly _id: string;
	rating: number;
	comment: string;
	author: IUser;
	date: Date;
}