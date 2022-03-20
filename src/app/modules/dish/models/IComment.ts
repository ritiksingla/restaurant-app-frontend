import { IUser } from 'src/app/modules/user/models/IUser';
import {IDish} from './IDish';

export interface IComment {
	readonly _id?: string;
	rating: number;
	content: string;
	createdAt: Date;
	author: IUser;
	dish: IDish;
}