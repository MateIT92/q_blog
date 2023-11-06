import axios, { AxiosResponse } from "axios";
import {
  CommentModel,
  CommentsListModel,
  PostModel,
  PostsListModel,
  UserModel,
  UsersIdsListModel,
} from "./responseModels";
import { extractNextLink } from "../components/util/utilHelpers";
import {
  commnetsError,
  postsErrorMessage,
  userDataErrorMessage,
} from "../utils/utilMessages";

const BASE_URL = "https://jsonplaceholder.typicode.com";

interface PostsParamsType {
  id?: number;
  userId?: string;
  _expand?: string;
  _page?: number;
  _limit?: number;
}

interface CommentsParamsType {
  postId?: number;
  _page?: number;
  _limit?: number;
}
interface UsersParamsType {
  username_like?: string;
  _page?: number;
  _limit?: number;
}

export const fetchPosts = async (
  url?: string,
  userIds?: string,
  singlePostId?: number
): Promise<PostsListModel> => {
  try {
    const endpoint = url || `${BASE_URL}/posts`;
    const params: PostsParamsType = url
      ? {}
      : {
          _expand: "user",
          _page: 1,
          _limit: 5,
          ...(singlePostId && { id: singlePostId }),
          ...(userIds && { userId: userIds }),
        };
    const response: AxiosResponse<PostModel[]> = await axios.get(endpoint, {
      params,
    });
    const link = extractNextLink(response.headers.link);
    return { data: response.data, link };
  } catch (error) {
    throw new Error(postsErrorMessage + error);
  }
};

export const fetchComments = async (
  postId: number,
  url?: string
): Promise<CommentsListModel> => {
  try {
    const endpoint = url || `${BASE_URL}/comments`;
    const params: CommentsParamsType = url
      ? {}
      : { postId, _page: 1, _limit: 3 };
    const response: AxiosResponse<CommentModel[]> = await axios.get(endpoint, {
      params,
    });
    return {
      data: response.data,
      link: extractNextLink(response.headers.link),
    };
  } catch (error) {
    throw new Error(commnetsError + error);
  }
};

export const fetchUserIdsByUsername = async (
  username?: string,
  url?: string
): Promise<UsersIdsListModel> => {
  try {
    const endpoint = url || `${BASE_URL}/users`;
    const params: UsersParamsType = url
      ? {}
      : { username_like: username, _page: 1, _limit: 1 };
    const response: AxiosResponse<UserModel[]> = await axios.get(endpoint, {
      params,
    });
    return {
      data: response.data,
      link: extractNextLink(response.headers.link),
    };
  } catch (error) {
    throw new Error(userDataErrorMessage + error);
  }
};
