import { CommentModel, LinkModel } from "../../adapters/responseModels";

export const COMMENTS_FETCH_INIT = "COMMENTS_FETCH_INIT";
export const COMMENTS_FETCH_SUCCESS = "COMMENTS_FETCH_SUCCESS";
export const COMMENTS_FETCH_FAILURE = "COMMENTS_FETCH_FAILURE";
export const COMMENTS_RESET = "COMMENTS_RESET";

export interface CommentsState {
  comments: CommentModel[];
  link: LinkModel;
  commentsError: boolean;
  commentsLoading: boolean;
}
export type CommentsAction =
  | { type: "COMMENTS_FETCH_INIT" }
  | {
      type: "COMMENTS_FETCH_SUCCESS";
      payload: { comments: CommentModel[]; link: LinkModel };
    }
  | { type: "COMMENTS_FETCH_FAILURE" }
  | { type: "COMMENTS_RESET" };
