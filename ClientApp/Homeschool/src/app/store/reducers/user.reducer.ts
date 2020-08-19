import * as userActions from '../actions/user.action'
import { createReducer, on, Action } from '@ngrx/store';
import { User } from '../../interfaces/user.interface';

export interface UserState {
    currentuser: User,
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
    }
};

const reducer = createReducer(initialUserState,
    on(userActions.setUserInfo, (state, { user }) => ({ ...state, currentuser: user })),
    on(userActions.clearUser, (state) => ({ ...initialUserState }))
);

export function userReducer(state: UserState, action: Action) {
    return reducer(state, action);
}