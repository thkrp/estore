import { CardType } from '../enums/card.type';

export type HorizontalSliderProps<T> = {
    slides?: T[];
    title: string;
    type?: CardType;
};
