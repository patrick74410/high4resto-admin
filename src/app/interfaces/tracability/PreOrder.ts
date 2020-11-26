import { StockI } from '../StockI';

export interface PreOrderI {
    id?: string;
    stock: StockI;
    inside: string;
    idCustommer: string;
}