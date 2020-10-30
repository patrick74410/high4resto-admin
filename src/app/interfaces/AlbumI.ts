import { ImageI } from './imageI';

export interface AlbumI {
    id:String;
    name:String;
    photos:ImageI[];
}