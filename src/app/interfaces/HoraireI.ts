import { BetweenTimeI } from './BetweenTimeI';

export interface HoraireI{
    id:String;
    lundi:BetweenTimeI[];
    mardi:BetweenTimeI[];
    mercredi:BetweenTimeI[];
    jeudi:BetweenTimeI[];
    vendredi:BetweenTimeI[];
    samedi:BetweenTimeI[];
    dimanche:BetweenTimeI[];
    ferie:BetweenTimeI[];
}