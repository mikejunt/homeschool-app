import { createAction, props } from '@ngrx/store';
import { UserMembership } from '../../interfaces/user-membership.interface';
import { User } from '../../interfaces/user.interface';

export const setUserInfo = createAction(
    "[USER STATE] Set User Info",
    props<{ user: User }>()
);
export const setUserMemberships = createAction(
    "[USER STATE] Set User Memberships",
    props<{ membership: UserMembership[] }>()
);

export const clearUser = createAction("[USER STATE] Clear User");
