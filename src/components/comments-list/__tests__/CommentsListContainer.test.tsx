import { render } from "@testing-library/react";
import CommentsListContainer from "../CommentsListContainer";
import { useFetchComments } from "../../util/useFetchComments";
import { moreComents, noComments } from "../../../utils/utilMessages";

jest.mock("../../util/useFetchComments", () => ({
  useFetchComments: jest.fn(),
}));

describe("CommentsListContainer", () => {
  jest.spyOn(console, "log").mockImplementation(() => {});
  const mockFetchData = jest.fn();
  const postId = 1;
  const commentsError = "Comments error";
  const mockComments = [
    { postId: 1, body: "Comment 1", name: "Name 1", email: "Email 1" },
  ];

  beforeEach(() => {
    (useFetchComments as jest.Mock).mockReturnValue({
      comments: [],
      link: { next: null },
      fetchData: mockFetchData,
      commentsError: false,
      commentsLoading: false,
    });
  });

  it("fetches comments on mount", () => {
    render(<CommentsListContainer postId={postId} />);
    expect(mockFetchData).toHaveBeenCalledWith(postId);
  });

  it("displays an error message when there is an error fetching comments", () => {
    (useFetchComments as jest.Mock).mockReturnValueOnce({
      ...useFetchComments(),
      commentsError: true,
    });

    const { getByText } = render(<CommentsListContainer postId={postId} />);
    expect(getByText(commentsError)).toBeTruthy();
  });

  it("displays a loader when loading comments", () => {
    (useFetchComments as jest.Mock).mockReturnValueOnce({
      ...useFetchComments(),
      commentsLoading: true,
    });

    const { container } = render(<CommentsListContainer postId={postId} />);
    expect(container.querySelector(".loader")).not.toBeNull();
  });

  it("displays a no data message when there are no comments", () => {
    (useFetchComments as jest.Mock).mockReturnValueOnce({
      ...useFetchComments(),
      comments: [],
    });

    const { getByText } = render(<CommentsListContainer postId={postId} />);
    expect(getByText(noComments)).toBeTruthy();
  });

  it("displays the comments when there are comments", () => {
    (useFetchComments as jest.Mock).mockReturnValueOnce({
      ...useFetchComments(),
      comments: mockComments,
    });

    const { getByText } = render(<CommentsListContainer postId={postId} />);
    expect(getByText(mockComments[0].body)).toBeTruthy();
  });

  it("fetches more comments when the next button is clicked", () => {
    (useFetchComments as jest.Mock).mockReturnValueOnce({
      ...useFetchComments(),
      comments: mockComments,
      link: { next: "next" },
    });

    const { getByText } = render(<CommentsListContainer postId={postId} />);
    getByText(moreComents).click();
    expect(mockFetchData).toHaveBeenCalledWith(postId, "next");
  });

  it("Logs the message and component name on mount", () => {
    const message = "Hello";
    render(<CommentsListContainer postId={postId} message={message} />);
    expect(console.log).toHaveBeenCalledWith(`${message} CommentsContainer`);
  });
});
