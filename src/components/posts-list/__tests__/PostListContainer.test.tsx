import { render } from "@testing-library/react";
import {  useNavigate, useParams } from "react-router-dom";
import PostsListContainer from "../PostsListContainer";
import { useBlogGlobalContext } from "../../../context/BlogGlobalContextProvider";
import { useFetchUserData } from "../../util/useFetchFilteredUserData";
import { useFetchPostData } from "../../util/useFetchData";
import {  postsErrorMessage } from "../../../utils/utilMessages";
import { PostModel, UserModel } from "../../../adapters/responseModels";

jest.mock("../../../context/BlogGlobalContextProvider", () => ({
  useBlogGlobalContext: jest.fn(),
}));
jest.mock("react-router-dom", () => ({
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));
jest.mock("../../util/useFetchData", () => ({
  useFetchPostData: jest.fn(),
}));
jest.mock("../../util/useFetchFilteredUserData", () => ({
  useFetchUserData: jest.fn(),
}));

const mockToggleCommentsVisibility = jest.fn();
const mockToggleSearchActive = jest.fn();
const mockFetchData = jest.fn();
const mockFetchUserData = jest.fn();
const mockToggleRefreshData = jest.fn();
const mockDispatch = jest.fn();

const mockContext = {
  searchTerm: "",
  isCommentsOpen: false,
  commentsPostId: null,
  toggleCommentsVisibility: mockToggleCommentsVisibility,
  toggleSearchActive: mockToggleSearchActive,
  refresh: false,
  toggleRefreshData: mockToggleRefreshData,
};
const createPosts = (count: number): PostModel[] => {
  const user = new UserModel(1, "testuser");
  return Array.from({ length: count }, (_, index) => {
    return new PostModel(
      1,
      user,
      index,
      `Title ${index}`,
      `Body of post ${index}`
    );
  });
};
describe("PostsContainer", () => {
  jest.spyOn(console, "log").mockImplementation(() => {});
  const mockPosts = createPosts(3);
  beforeEach(() => {

    jest.clearAllMocks();
    (useBlogGlobalContext as jest.Mock).mockReturnValue(mockContext);
    (useParams as jest.Mock).mockReturnValue({ id: "1" });
    (useNavigate as jest.Mock).mockReturnValue(jest.fn());
    (useFetchPostData as jest.Mock).mockReturnValue({
      posts: [],
      link: { next: null },
      fetchData: mockFetchData,
      postsError: false,
      postsLoading: { status: false, type: "" },
      postsDispatch: jest.fn(),
    });
    (useFetchUserData as jest.Mock).mockReturnValue({
      usersNextLink: { next: null },
      userDataError: false,
      usersLoading: { status: false, type: "" },
      fetchUserData: mockFetchUserData,
      isSearchResult: false,
      dispatch: mockDispatch,
    });
  });

  it("renders without crashing", () => {
    render(<PostsListContainer />);
  });

  it("fetches posts on mount", () => {
    render(<PostsListContainer />);
    expect(mockFetchData).toHaveBeenCalled();
  });

  it("displays an error message when there is an error fetching posts", () => {
    (useFetchPostData as jest.Mock).mockReturnValueOnce({
      ...useFetchPostData(),
      postsError: true,
    });

    const { getByText } = render(<PostsListContainer />);
    expect(getByText(postsErrorMessage)).toBeTruthy();
  });

  it("displays the posts when there are comments", () => {
    (useFetchPostData as jest.Mock).mockReturnValueOnce({
      ...useFetchPostData(),
      posts: mockPosts,
    });

    const { getByText } = render(<PostsListContainer />);
    expect(getByText(mockPosts[0].body)).toBeTruthy();
  });

  it("fetches more posts when the next button is clicked", () => {
    (useFetchPostData as jest.Mock).mockReturnValueOnce({
      ...useFetchPostData(),
      posts: mockPosts,
      link: { next: "next" },
    });

    render(<PostsListContainer />);
    expect(mockFetchData).toHaveBeenCalled();
  });
});
