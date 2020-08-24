import { createAction, props } from '@ngrx/store';


export const setViewedUser = createAction(
    "[VIEW STATE] Set Viewed User ID",
    props<{ uid: number }>()
);
export const seViewedFamily = createAction(
    "[VIEW STATE] Set Viewed Family ID",
    props<{ fid: number }>()
);

export const clearViews = createAction("[VIEW STATE] Clear Views");
