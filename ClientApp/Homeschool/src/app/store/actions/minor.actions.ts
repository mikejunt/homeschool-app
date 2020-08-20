import { createAction, props } from '@ngrx/store';
import { UserMembership } from '../../interfaces/user-membership.interface';
import { User } from '../../interfaces/user.interface';

export const setMinorInfo = createAction(
    "[MINOR STATE] Set Minor User Info",
    props<{ minors: Array<User> }>()
);
export const setMinorMemberships = createAction(
    "[MINOR STATE] Set Minor Memberships",
    props<{ membership: UserMembership[] }>()
);

export const clearMinors = createAction("[MINOR STATE] Clear Minors");
