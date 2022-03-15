import { IComment } from './IComment';

export interface IDish {
	readonly _id?: string;
	name: string;
	imageUrl: string;
	category: string;
	label: string;
	price: number;
	description: string;
	starRating: number;
	comments?: IComment[];
}