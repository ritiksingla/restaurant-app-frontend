import {IComment} from './IComment';

export interface IDish {
    id: number;
    name: string;
    imageUrl: string;
    category: string;
    featured: boolean;
    label: string;
    price: number;
    description: string;
    starRating: number;
    comments:IComment[];
}