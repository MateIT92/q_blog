import { render, screen } from "@testing-library/react";
import ListItem from "../ListItemComponent";
import {
  CommentModel,
  PostModel,
  UserModel,
} from "../../../adapters/responseModels";

jest.mock("../../../utils/utilMessages", () => ({
  byAuthor: "by",
}));

describe("ListItem", () => {
  jest.spyOn(console, "log").mockImplementation(() => {});
  it("renders with PostModel data", () => {
    const post = new PostModel(
      1,
      new UserModel(1, "User1"),
      101,
      "Post Title",
      "Post body content"
    );

    render(<ListItem post={post} id="post-101" />);

    expect(screen.getByText(post.title)).toBeInTheDocument();
    expect(screen.getByText(`by ${post.user.username}`)).toBeInTheDocument();
    expect(screen.getByText(post.body)).toBeInTheDocument();
  });

  it("renders with CommentModel data", () => {
    const comment = new CommentModel(
      1,
      201,
      "Commenter Name",
      "commenter@example.com",
      "Comment body content"
    );

    render(<ListItem comment={comment} id="comment-201" />);

    expect(screen.getByText(comment.name)).toBeInTheDocument();
    expect(screen.getByText(`by ${comment.email}`)).toBeInTheDocument();
    expect(screen.getByText(comment.body)).toBeInTheDocument();
  });
});
