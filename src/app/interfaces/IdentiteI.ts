import { GpsI } from './GpsI';
import { ImageI } from './imageI';
import {KeyMapI} from './KeymapI'

export interface IdentiteI {
    id:String;
    nomEtablissement:String;
    zip:String;
    city:String;
    number:String;
    adresse:String;
    complement:String;
    contact:KeyMapI[];
    siret:String;
    coordonnee:GpsI;
    logo:ImageI;
    description:String;
}