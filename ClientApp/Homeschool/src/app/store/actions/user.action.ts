import { createAction, props } from '@ngrx/store';
import { User } from '../../interfaces/user.interface'

export const setUserInfo = createAction(
    "[USER STATE] Set User Info",
    props<{ user: User }>()
);

export const clearUser = createAction("[USER STATE] Clear User");
