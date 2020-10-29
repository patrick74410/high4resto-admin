import { CategorieI } from './categorieI';
import {AllergeneI} from './allergeneI'
import { ImageI } from './imageI';
import { TvaI } from './TvaI';
import { OptionsItemI } from './OptionsItem';
import { PromotionI } from './promotionI';

export interface ItemCarteI {
    id: String;
    name: String; 
    description: String;
    price: Number;
    order: Number;
    sourceImage: ImageI;
    categorie: CategorieI;
    allergenes: AllergeneI[];
    tva:TvaI;
    options:OptionsItemI[];
    visible:boolean;
    promotions:PromotionI[];
 }