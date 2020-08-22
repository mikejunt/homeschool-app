import { RootState } from '..';

export const getFids = (state: RootState) => state.family.fids
export const getFamilyMembers = (state: RootState) => state.family.familymembers