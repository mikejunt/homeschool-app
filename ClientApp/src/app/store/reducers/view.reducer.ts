import * as viewActions from '../actions/view.actions'
import { createReducer, on, Action } from '@ngrx/store';

export interface ViewState {
    viewuser: number,
    viewfamily: number
};

export const initialViewState: ViewState = {
    viewuser: 0,
    viewfamily: 0
};

const reducer = createReducer(initialViewState,
    on(viewActions.setViewedUser, (state, { uid }) => ({ ...state, viewuser: uid })),
    on(viewActions.seViewedFamily, (state, { fid }) => ({...state, viewfamily: fid})),
    on(viewActions.clearViews, (state) => ({ ...initialViewState }))
);

export function viewReducer(state: ViewState, action: Action) {
    return reducer(state, action);
}