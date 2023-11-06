import { LinkModel } from "../../adapters/responseModels";

export const USER_DATA_FETCH_INIT = "USER_DATA_FETCH_INIT";
export const USER_DATA_FETCH_SUCCESS = "USER_DATA_FETCH_SUCCESS";
export const USER_DATA_FETCH_FAILURE = "USER_DATA_FETCH_FAILURE";
export const USER_DATA_RESET = "USER_DATA_RESET";
export const USER_DATA_SET_IS_SEARCH_RESULT = "USER_DATA_SET_IS_SEARCH_RESULT";

export interface UserDataState {
  usersNextLink: LinkModel;
  userDataError: boolean;
  usersLoading: {
    status: boolean;
    type: string;
  };
  isSearchResult: boolean;
}

export type Action =
  | {
      type: "USER_DATA_FETCH_INIT";
      payload: { type: string; isSearchResult: boolean };
    }
  | { type: "USER_DATA_FETCH_SUCCESS"; payload: { nextLink: LinkModel } }
  | { type: "USER_DATA_FETCH_FAILURE" }
  | { type: "USER_DATA_RESET" }
  | { type: "USER_DATA_SET_IS_SEARCH_RESULT"; payload: boolean };
