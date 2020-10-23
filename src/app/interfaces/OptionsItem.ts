import { OptionItemI } from './OptionItem';

export interface OptionsItemI {
    id?: String;
    label:string;
    options: OptionItemI[];
    unique: boolean;
}