import { createAction, props } from '@ngrx/store';
import { FamilyMember } from '../../interfaces/family-member.interface';

export const setFamilyIds = createAction(
    "[FAMILY STATE] Set Family IDs",
    props<{ fids: Array<number> }>()
);
export const setFamilyMembers = createAction(
    "[FAMILY STATE] Set Family Member Data",
    props<{ familymembers: Array<FamilyMember> }>()
);

export const clearFamilyData = createAction("[FAMILY STATE] Clear Family Data");