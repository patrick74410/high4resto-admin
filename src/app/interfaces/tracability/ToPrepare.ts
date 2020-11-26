import { OrderI } from './Order';

export interface ToPrepareI {
    id?: string;
    order: OrderI;
    inside: string;
    executorName: string;
}