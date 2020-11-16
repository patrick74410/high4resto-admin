import { ImageI } from './ImageI';
// Catégorie de menu 
export interface ItemCategorieI {
    id?: String;
    // Nom de la catégorie
    name: String;
    // Présentation de la catégorie
    description: String;
    // Ordre d'affichage
    order?: Number;
    // Miniature
    iconImage?: ImageI;
    // Image pour la présentation
    image?:ImageI; 
 }