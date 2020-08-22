import { RootState } from '..';

export const getMinorProfiles = (state: RootState) => state.minors.identities
export const getMinorMemberships = (state: RootState) => state.minors.memberships