import { ImageI } from './ImageI';
// Catégorie d'articles
export interface ArticleCategorieI {
    id?: String;
    // Nom de la catégorie
    name: String;
    // Présentation de la catégorie
    description: String;
    // Ordre d'affichage
    order?: Number;
    // Image pour la miniature
    iconImage?: ImageI;
    // Image de la présentation de l'article
    image?:ImageI;
    // 
    visible:boolean;
}