import { categorieI } from './categorieI';
import {allergeneI} from './allergeneI'
import { imageI } from './imageI';

export interface itemMenuI {
    id: String;
    name: String; 
    description: String;
    price: Number;
    order: Number;
    sourceImage: imageI;
    categorie: categorieI;
    allergenes: allergeneI[];
 }