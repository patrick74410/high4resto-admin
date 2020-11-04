import { ImageI } from './imageI';

export interface CategorieI {
    id?: String;
    name: String;
    description: String;
    order?: Number;
    iconImage?: ImageI;
    image?:ImageI; 
 }