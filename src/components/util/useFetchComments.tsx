import { useReducer } from "react";
import { fetchComments } from "../../adapters/apiAdapter";
import {
  commentsReducer,
  initialState,
} from "../../reducers/comments/commnetsReducer";
import {
  COMMENTS_FETCH_FAILURE,
  COMMENTS_FETCH_INIT,
  COMMENTS_FETCH_SUCCESS,
} from "../../reducers/comments/commentsActionTypes";

export const useFetchComments = () => {
  const [state, dispatch] = useReducer(commentsReducer, initialState);

  const fetchData = async (postId: number, url?: string) => {
    dispatch({ type: COMMENTS_FETCH_INIT });
    try {
      const data = await fetchComments(postId, url);
      dispatch({
        type: COMMENTS_FETCH_SUCCESS,
        payload: {
          comments: url ? [...state.comments, ...data.data] : data.data,
          link: data.link,
        },
      });
    } catch (error) {
      dispatch({ type: COMMENTS_FETCH_FAILURE });
      console.error(error);
    }
  };

  return { ...state, fetchData };
};
