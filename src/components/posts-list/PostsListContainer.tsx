import { FC, useEffect } from "react";
import {
  helloMessage,
  hideCommentsMessage,
  morePosts,
  noPostsDataMessage,
  postsErrorMessage,
  searchResults,
  showCommentsMessage,
  userDataErrorMessage,
} from "../../utils/utilMessages";
import { useBlogGlobalContext } from "../../context/BlogGlobalContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchPostData } from "../util/useFetchData";
import { useFetchUserData } from "../util/useFetchFilteredUserData";
import { PostModel } from "../../adapters/responseModels";
import withHelloMessageLoader from "../util/withHelloMessageLoader";
import ButtonComponent from "../button/ButtonComponent";
import ListItemComponent from "../list-item/ListItemComponent";
import CommentsListContainer from "../comments-list/CommentsListContainer";
import ListComponent from "../list/ListComponent";
import LinkWrapComponent from "../link-wrap/LinkWrapComponent";
import { USER_DATA_SET_IS_SEARCH_RESULT } from "../../reducers/users/userDataActionTypes";
import "./PostsListContainer.css";

const PostsContainer: FC = () => {
  const {
    searchTerm,
    isCommentsOpen,
    commentsPostId,
    toggleCommentsVisibility,
    toggleSearchActive,
    refresh,
    toggleRefreshData,
  } = useBlogGlobalContext();

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { posts, link, fetchData, postsError, postsLoading, postsDispatch } =
    useFetchPostData();
  const {
    usersNextLink,
    userDataError,
    usersLoading,
    fetchUserData,
    isSearchResult,
    dispatch,
  } = useFetchUserData();

  useEffect(() => {
    if (searchTerm) {
      id && navigate("/");
      fetchUserData(toggleSearchActive, fetchData, postsDispatch, searchTerm);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (!usersLoading.status) {
      if (isSearchResult) {
        dispatch({ type: USER_DATA_SET_IS_SEARCH_RESULT, payload: false });
      }
      if (!id) {
        fetchData();
      } else {
        fetchData(undefined, undefined, Number(id));
      }
    }
  }, [id]);

  useEffect(() => {
    if (refresh) {
      fetchData();
      toggleRefreshData("");
      dispatch({ type: USER_DATA_SET_IS_SEARCH_RESULT, payload: false });
    }
  }, [refresh]);

  return (
    <>
      <div className="results">{isSearchResult && searchResults}</div>
      <ListComponent
        keyId="posts-list"
        message={helloMessage}
        error={
          postsError
            ? postsErrorMessage
            : userDataError
            ? userDataErrorMessage
            : undefined
        }
        noData={!posts.length ? noPostsDataMessage : undefined}
        items={posts}
        loading={
          (postsLoading.status && postsLoading.type === "posts") ||
          (usersLoading.status && usersLoading.type === "search")
            ? true
            : false
        }
        renderListItem={(post) => (
          <div className="posts-list-item">
            <div className="post-item">
              <LinkWrapComponent
                message={helloMessage}
                withLink={!id}
                to={`/post/${post.id}`}
              >
                <ListItemComponent
                  message={helloMessage}
                  post={post as PostModel}
                  id={id}
                />
              </LinkWrapComponent>
              {isCommentsOpen && commentsPostId === post.id && (
                <CommentsListContainer
                  message={helloMessage}
                  postId={post.id}
                />
              )}
            </div>
            <ButtonComponent
              className="comments-button"
              message={helloMessage}
              title={
                commentsPostId === post.id && isCommentsOpen
                  ? hideCommentsMessage
                  : showCommentsMessage
              }
              onClick={() => toggleCommentsVisibility(post.id)}
            />
          </div>
        )}
      />
      {
        <ButtonComponent
          className="posts-next-button"
          loading={
            (postsLoading.status && postsLoading.type === "next_posts") ||
            (usersLoading.status && usersLoading.type === "users")
              ? true
              : false
          }
          noData={
            (!link.next && !usersNextLink.next) ||
            id ||
            postsLoading.status ||
            usersLoading.status ||
            postsError
              ? " "
              : undefined
          }
          message={helloMessage}
          title={morePosts}
          onClick={() => {
            link.next
              ? fetchData(link.next)
              : fetchUserData(
                  toggleSearchActive,
                  fetchData,
                  postsDispatch,
                  undefined,
                  usersNextLink.next
                );
          }}
        />
      }
    </>
  );
};
const PostListContainer = withHelloMessageLoader(
  PostsContainer,
  PostsContainer.name as string
);
export default PostListContainer;
