
import { HoraireI } from './HoraireI';
import { ItemCarteI } from './ItemCarteI';

export interface StockI {
    id?:string;
    item: ItemCarteI;
    // Quand le produit est-il diponible?
    disponibility: HoraireI;
    // Quand a-t-il été ajouté
    inside?:string;
}