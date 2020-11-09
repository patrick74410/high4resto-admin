import { ImageI } from './imageI';
// Catégorie de menu 
export interface CategorieI {
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