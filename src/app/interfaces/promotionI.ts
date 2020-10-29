export interface PromotionI {
    id?:String;
    name:String;
    reduction:Number;
    heureDebut:String;
    heureFin:String;
    dateDebut:String;
    dateFin:String;
    jourValide:boolean[];
    jourFerie:boolean;
    pourcentage:boolean;
}