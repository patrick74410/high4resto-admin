import { GpsI } from './GpsI';
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
}