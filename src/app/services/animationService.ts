import { style, trigger, state, transition, animate } from "@angular/animations";

export const slideDownState = (height: number) => {
    return state('up', style({
        transform: `translateY(-${height}px)`
      }));
};
