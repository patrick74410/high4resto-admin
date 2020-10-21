import { CategorieI } from './categorieI';
import {AllergeneI} from './allergeneI'
import { ImageI } from './imageI';

export interface ItemMenuI {
    id: String;
    name: String; 
    description: String;
    price: Number;
    order: Number;
    sourceImage: ImageI;
    categorie: CategorieI;
    allergenes: AllergeneI[];
 }