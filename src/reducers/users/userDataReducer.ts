import {
  Action,
  USER_DATA_FETCH_FAILURE,
  USER_DATA_FETCH_INIT,
  USER_DATA_FETCH_SUCCESS,
  USER_DATA_RESET,
  USER_DATA_SET_IS_SEARCH_RESULT,
  UserDataState,
} from "./userDataActionTypes";

export const initialState: UserDataState = {
  usersNextLink: {},
  userDataError: false,
  usersLoading: { status: false, type: "" },
  isSearchResult: false,
};

export function userDataReducer(
  state: UserDataState,
  action: Action
): UserDataState {
  switch (action.type) {
    case USER_DATA_FETCH_INIT:
      return {
        ...state,
        usersLoading: { status: true, type: action.payload.type },
        userDataError: false,
        isSearchResult: action.payload.isSearchResult,
      };
    case USER_DATA_FETCH_SUCCESS:
      return {
        ...state,
        usersNextLink: action.payload.nextLink,
        usersLoading: { status: false, type: "" },
      };
    case USER_DATA_SET_IS_SEARCH_RESULT:
      return {
        ...state,
        isSearchResult: action.payload,
      };
    case USER_DATA_FETCH_FAILURE:
      return {
        ...state,
        userDataError: true,
        usersLoading: { status: false, type: "" },
        usersNextLink: {},
        isSearchResult: false,
      };
    case USER_DATA_RESET:
      return initialState;
    default:
      return state;
  }
}
