import { render, screen } from "@testing-library/react";
import ListComponent from "../ListComponent";
import {
  CommentModel,
  PostModel,
  UserModel,
} from "../../../adapters/responseModels";

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

const createComments = (count: number): CommentModel[] => {
  return Array.from({ length: count }, (_, index) => {
    return new CommentModel(
      1,
      index,
      `Name ${index}`,
      `email${index}@example.com`,
      `Body of comment ${index}`
    );
  });
};

const renderItem = (item: PostModel | CommentModel) => (
  <div className="item-content">
    {"title" in item
      ? `${item.title}: ${item.body}`
      : `${item.name}: ${item.body}`}
  </div>
);

describe("ListComponent", () => {
  jest.spyOn(console, "log").mockImplementation(() => {});
  it("renders a list of post items", () => {
    const posts = createPosts(3);
    render(
      <ListComponent items={posts} renderListItem={renderItem} keyId="post-" />
    );

    posts.forEach((post) => {
      expect(
        screen.getByText(`${post.title}: ${post.body}`)
      ).toBeInTheDocument();
    });
  });

  it("renders a list of comment items", () => {
    const comments = createComments(3);
    render(
      <ListComponent
        items={comments}
        renderListItem={renderItem}
        keyId="comment-"
      />
    );

    comments.forEach((comment) => {
      expect(
        screen.getByText(`${comment.name}: ${comment.body}`)
      ).toBeInTheDocument();
    });
  });
});
