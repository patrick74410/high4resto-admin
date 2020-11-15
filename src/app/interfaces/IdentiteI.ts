import { GpsI } from './GpsI';
import { ImageI } from './ImageI';
import {KeyMapI} from './KeymapI'
// Identité de l'établissement
export interface IdentiteI {
    id:String;
    // Info de base
    nomEtablissement:String;
    siret:String;
    logo:ImageI;
    // Adresse
    zip:String;
    city:String;
    number:String;
    adresse:String;
    complement:String;
    contact:KeyMapI[];
    coordonnee:GpsI;

    // Description de l'établissement
    description:String;
}