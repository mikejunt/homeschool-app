import { RootState } from '..';

export const getUserEmail = (state: RootState) => state.user.currentuser.email
export const getUserId = (state: RootState) => state.user.currentuser.id
export const getUserInfo = (state: RootState) => state.user.currentuser