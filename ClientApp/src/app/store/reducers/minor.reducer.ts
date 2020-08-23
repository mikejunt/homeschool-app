import * as minorActions from '../actions'
import { createReducer, on, Action } from '@ngrx/store';
import { User } from '../../interfaces/user.interface';
import { UserMembership } from '../../interfaces/user-membership.interface';

export interface MinorState {
    identities: Array<User>,
    memberships: Array<UserMembership>
};

export const initialMinorState: MinorState = {
    identities: [],
    memberships: []
};

const reducer = createReducer(initialMinorState,
    on(minorActions.setMinorInfo, (state, { minors }) => ({ ...state, identities: minors })),
    on(minorActions.setMinorMemberships, (state, { membership }) => ({...state, memberships: membership})),
    on(minorActions.clearMinors, (state) => ({ ...initialMinorState }))
);

export function minorReducer(state: MinorState, action: Action) {
    return reducer(state, action);
}