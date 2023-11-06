import { LinkModel, PostModel } from "../../adapters/responseModels";

export const POSTS_FETCH_INIT = "POSTS_FETCH_INIT";
export const POSTS_FETCH_SUCCESS = "POSTS_FETCH_SUCCESS";
export const POSTS_FETCH_FAILURE = "POSTS_FETCH_FAILURE";
export const POSTS_SET_LINK = "POSTS_SET_LINK";
export const POSTS_RESET = "POSTS_RESET";

export interface PostDataState {
  posts: PostModel[];
  link: LinkModel;
  postsError: boolean;
  postsLoading: {
    status: boolean;
    type: string;
  };
}

export type PostDataAction =
  | { type: "POSTS_FETCH_INIT"; payload: { nextUser: boolean } }
  | {
      type: "POSTS_FETCH_SUCCESS";
      payload: { data: PostModel[]; link: LinkModel };
    }
  | { type: "POSTS_FETCH_FAILURE" }
  | { type: "POSTS_SET_LINK"; payload: LinkModel }
  | { type: "POSTS_RESET" };
