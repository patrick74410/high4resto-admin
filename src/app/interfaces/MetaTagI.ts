import { KeyMapI } from './KeymapI';

export interface MetaTagI {
    id?:string;
    description:string;
    keywords:string;
    author:string;
    facebookTitle:string;
    facebookDescription:string;
    facebookImage:string;
    twitterTitle:string;
    twitterDescription:string;
    twitterImage:string;
    twitterAuthor:string;
    other:KeyMapI[];
}