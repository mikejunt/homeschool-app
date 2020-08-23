import * as userActions from '../actions/user.action'
import { createReducer, on, Action } from '@ngrx/store';
import { User } from '../../interfaces/user.interface';
import { UserMembership } from '../../interfaces/user-membership.interface';

export interface UserState {
    currentuser: User,
    memberships: Array<UserMembership>
};

export const initialUserState: UserState = {
    currentuser:     {
        id: 0,
        email: "",
        firstName: "",
        lastName: "",
        photo: "",
        minor: false,
        parentEmail: ""
    },
    memberships: []
};

const reducer = createReducer(initialUserState,
    on(userActions.setUserInfo, (state, { user }) => ({ ...state, currentuser: user })),
    on(userActions.setUserMemberships, (state, { membership }) => ({...state, memberships: membership})),
    on(userActions.clearUser, (state) => ({ ...initialUserState }))
);

export function userReducer(state: UserState, action: Action) {
    return reducer(state, action);
}