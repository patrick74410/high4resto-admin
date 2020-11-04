import { ArticleCategorieI } from './ArticleCategorieI';
import { ImageI } from './imageI';

export interface ArticleI{
    id?: String;
    categorie:ArticleCategorieI;
    image?:ImageI;
    onTop?:boolean;
    visible?:boolean;
    title:string;
    resume?:string;
    content:string;
    date:string;
    author:string;
}