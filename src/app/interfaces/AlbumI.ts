import { ImageI } from './imageI';

export interface AlbumI {
    id?:String;
    name:String;
    description:String;
    photos:ImageI[];
    visible:boolean;
}