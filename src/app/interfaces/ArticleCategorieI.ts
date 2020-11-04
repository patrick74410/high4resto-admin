import { ImageI } from './imageI';

export interface ArticleCategorieI {
    id?: String;
    name: String;
    description: String;
    order?: Number;
    iconImage?: ImageI;
    image?:ImageI;
}