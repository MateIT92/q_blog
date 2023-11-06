import { useCallback, useReducer } from "react";
import { fetchUserIdsByUsername } from "../../adapters/apiAdapter";
import { LinkModel } from "../../adapters/responseModels";
import {
  Action,
  USER_DATA_FETCH_FAILURE,
  USER_DATA_FETCH_INIT,
  USER_DATA_FETCH_SUCCESS,
  USER_DATA_RESET,
  UserDataState,
} from "../../reducers/users/userDataActionTypes";
import {
  initialState,
  userDataReducer,
} from "../../reducers/users/userDataReducer";
import {
  POSTS_RESET,
  PostDataAction,
} from "../../reducers/posts/postsActionTypes";
import { search, users } from "../../utils/utilMessages";

type FetchDataType = (
  url?: string,
  userIds?: string,
  singlePostId?: number,
  nextUser?: boolean,
  toggleSearchActive?: (keyword: string) => void
) => Promise<void>;

interface UseFetchUserDataReturnType {
  usersNextLink: LinkModel;
  userDataError: boolean;
  usersLoading: {
    status: boolean;
    type: string;
  };
  isSearchResult: boolean;
  fetchUserData: (
    toggleSearchActive: (keyword: string) => void,
    fetchData: FetchDataType,
    postsDispatch: React.Dispatch<PostDataAction>,
    searchTerm?: string,
    url?: string
  ) => Promise<void>;
  dispatch: React.Dispatch<Action>;
}

export const useFetchUserData = (): UseFetchUserDataReturnType => {
  const [state, dispatch] = useReducer<React.Reducer<UserDataState, Action>>(
    userDataReducer,
    initialState
  );

  const fetchUserData = useCallback(
    async (
      toggleSearchActive: (keyword: string) => void,
      fetchData: FetchDataType,
      postsDispatch: React.Dispatch<PostDataAction>,
      searchTerm?: string,
      url?: string
    ) => {
      dispatch({
        type: USER_DATA_FETCH_INIT,
        payload: {
          type: searchTerm && !url ? search : users,
          isSearchResult: searchTerm && !url ? true : false,
        },
      });

      try {
        const data = await fetchUserIdsByUsername(searchTerm, url);
        const userIds = data.data
          .map((user: { id: number }) => `${user.id}`)
          .join("&");

        if (!userIds) {
          postsDispatch({ type: POSTS_RESET });
          dispatch({ type: USER_DATA_RESET });
          toggleSearchActive("");
          return;
        }
        dispatch({
          type: USER_DATA_FETCH_SUCCESS,
          payload: { nextLink: data.link },
        });

        url
          ? await fetchData(undefined, userIds, undefined, true)
          : await fetchData(
              undefined,
              userIds,
              undefined,
              undefined,
              toggleSearchActive
            );
      } catch (error) {
        console.error(error);
        postsDispatch({ type: POSTS_RESET });
        dispatch({ type: USER_DATA_FETCH_FAILURE });
        toggleSearchActive("");
      }
    },
    []
  );

  return { ...state, fetchUserData, dispatch };
};
