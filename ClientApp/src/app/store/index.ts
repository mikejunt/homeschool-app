import * as Reducers from "./reducers";
import { ActionReducerMap } from "@ngrx/store";

export interface RootState {
  user: Reducers.UserState,
  family: Reducers.FamilyState,
  minors: Reducers.MinorState
}

export const reducers: ActionReducerMap<RootState> = {
  user: Reducers.userReducer,
  family: Reducers.familyReducer,
  minors: Reducers.minorReducer
};
