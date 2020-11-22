import { BetweenTimeI } from './BetweenTimeI';

export interface DisponibilityI {
    disponible: BetweenTimeI[];
    dateDebut:String;
    dateFin:String;
    jourValide:boolean[];
    ferie:boolean;
}