import { PreOrderI } from './PreOrder';

export interface OrderI {
    id?: string;
    preOrder: PreOrderI;
    inside: string;
    mandatory: string;
    deleveryMode: string;
    orderNumber: string;
    meansOfPayement: string;
}