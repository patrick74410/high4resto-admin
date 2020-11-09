export interface PromotionI {
// Définition d'une promotion
    id?:String;
    // Nom
    name:String;
    // Montant de la réduction
    reduction:Number;
    // Quand ?
    heureDebut:String;
    heureFin:String;
    dateDebut:String;
    dateFin:String;
    // Tableau de taille 7 pour chaque jour de la semaine
    jourValide:boolean[];
    jourFerie:boolean;
    // En euro ou en pourcentage ?
    pourcentage:boolean;
}