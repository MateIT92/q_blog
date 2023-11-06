import { useCallback, useReducer } from "react";
import { fetchPosts } from "../../adapters/apiAdapter";
import {
  initialState,
  postDataReducer,
} from "../../reducers/posts/postsDataReducer";
import {
  POSTS_FETCH_FAILURE,
  POSTS_FETCH_INIT,
  POSTS_FETCH_SUCCESS,
} from "../../reducers/posts/postsActionTypes";

export const useFetchPostData = () => {
  const [state, postsDispatch] = useReducer(postDataReducer, initialState);

  const fetchData = useCallback(
    async (
      url?: string,
      userIds?: string,
      singlePostId?: number,
      nextUser?: boolean,
      toggleSearchActive?: (keyword: string) => void
    ) => {
      postsDispatch({
        type: POSTS_FETCH_INIT,
        payload: { nextUser: !!nextUser || url !== undefined },
      });

      try {
        const data = await fetchPosts(url, userIds, singlePostId);
        postsDispatch({
          type: POSTS_FETCH_SUCCESS,
          payload: { data: data.data, link: data.link },
        });
        if (toggleSearchActive && !nextUser) {
          toggleSearchActive("");
        }
      } catch (error) {
        postsDispatch({ type: POSTS_FETCH_FAILURE });
        if (toggleSearchActive && !nextUser) {
          toggleSearchActive("");
        }
      }
    },[]
  );

  return { ...state, fetchData, postsDispatch };
};
