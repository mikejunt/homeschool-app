import * as familyActions from '../actions'
import { createReducer, on, Action } from '@ngrx/store';
import { FamilyMember } from '../../interfaces/family-member.interface';

export interface FamilyState {
    fids: Array<number>,
    familymembers: Array<FamilyMember>
};

export const initialFamilyState: FamilyState = {
    fids: [],
    familymembers: []
};

const reducer = createReducer(initialFamilyState,
    on(familyActions.setFamilyIds, (state, { fids }) => ({ ...state, fids: fids})),
    on(familyActions.setFamilyMembers, (state, { familymembers }) => ({...state, familymembers: familymembers})),
    on(familyActions.clearFamilyData, (state) => ({ ...initialFamilyState }))
);

export function familyReducer(state: FamilyState, action: Action) {
    return reducer(state, action);
}