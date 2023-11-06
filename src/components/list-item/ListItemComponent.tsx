import { FC } from "react";
import { CommentModel, PostModel } from "../../adapters/responseModels";
import { byAuthor } from "../../utils/utilMessages";
import withHelloMessageLoader from "../util/withHelloMessageLoader";
import "./ListItemComponent.css";

interface ListItemProps {
  comment?: CommentModel;
  post?: PostModel;
  id?: string;
}

const ListItem: FC<ListItemProps> = ({ comment, post, id }) => {
  return (
    <>
      <div className="list-item-title">{post ? post.title : comment!.name}</div>
      <div className="list-item-author">
        {byAuthor} {post ? post.user.username : comment!.email}
      </div>
      <div className={`list-item-content ${id ? "" : "elipsis"}`}>
        {post ? post.body : comment!.body}
      </div>
    </>
  );
};
const ListItemComponent = withHelloMessageLoader(
  ListItem,
  ListItem.name as string
);
export default ListItemComponent;
