import {
  CommentsAction,
  CommentsState,
  COMMENTS_FETCH_FAILURE,
  COMMENTS_FETCH_INIT,
  COMMENTS_FETCH_SUCCESS,
  COMMENTS_RESET,
} from "./commentsActionTypes";

export const initialState: CommentsState = {
  comments: [],
  link: {},
  commentsError: false,
  commentsLoading: false,
};

export function commentsReducer(
  state: CommentsState,
  action: CommentsAction
): CommentsState {
  switch (action.type) {
    case COMMENTS_FETCH_INIT:
      return { ...state, commentsLoading: true };
    case COMMENTS_FETCH_SUCCESS:
      return {
        ...state,
        comments: action.payload.comments,
        link: action.payload.link,
        commentsError: false,
        commentsLoading: false,
      };
    case COMMENTS_FETCH_FAILURE:
      return {
        ...state,
        commentsError: true,
        comments: [],
        link: {},
        commentsLoading: false,
      };
    case COMMENTS_RESET: {
      return initialState;
    }
    default:
      return state;
  }
}
