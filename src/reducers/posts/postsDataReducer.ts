import { next_posts, posts } from "../../utils/utilMessages";
import {
  POSTS_FETCH_FAILURE,
  POSTS_FETCH_INIT,
  POSTS_FETCH_SUCCESS,
  POSTS_RESET,
  POSTS_SET_LINK,
  PostDataAction,
  PostDataState,
} from "./postsActionTypes";

export const initialState: PostDataState = {
  posts: [],
  link: {},
  postsError: false,
  postsLoading: { status: false, type: "" },
};

export function postDataReducer(
  state: PostDataState,
  action: PostDataAction
): PostDataState {
  switch (action.type) {
    case POSTS_FETCH_INIT:
      return {
        ...state,
        postsLoading: {
          status: true,
          type: action.payload.nextUser ? next_posts : posts,
        },
      };
    case POSTS_FETCH_SUCCESS:
      return {
        ...state,
        posts:
          state.postsLoading.type === next_posts
            ? [...state.posts, ...action.payload.data]
            : action.payload.data,
        link: action.payload.link,
        postsError: false,
        postsLoading: { status: false, type: "" },
      };
    case POSTS_FETCH_FAILURE:
      return {
        ...state,
        postsError: true,
        posts: [],
        link: {},
        postsLoading: { status: false, type: "" },
      };
    case POSTS_SET_LINK:
      return {
        ...state,
        link: action.payload,
      };
    case POSTS_RESET:
      return initialState;
    default:
      return state;
  }
}
