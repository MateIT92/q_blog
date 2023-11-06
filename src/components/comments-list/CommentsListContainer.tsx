import { FC, useEffect } from "react";
import { useFetchComments } from "../util/useFetchComments";
import { CommentModel } from "../../adapters/responseModels";
import {
  commnetsError,
  helloMessage,
  moreComents,
  noComments,
} from "../../utils/utilMessages";
import withHelloMessageLoader from "../util/withHelloMessageLoader";
import ButtonComponent from "../button/ButtonComponent";
import ListComponent from "../list/ListComponent";
import ListItemComponent from "../list-item/ListItemComponent";
import "./CommentsListContainer.css";

interface CommentsContainerProps {
  postId: number;
}

const CommentsContainer: FC<CommentsContainerProps> = ({ postId }) => {
  const { comments, link, fetchData, commentsError, commentsLoading } =
    useFetchComments();

  useEffect(() => {
    fetchData(postId);
  }, [postId]);

  return (
    <div className="comments-container">
      <div className="comments-list">
        <ListComponent
          keyId={`comments-list-${postId}`}
          message={helloMessage}
          items={comments}
          error={commentsError ? commnetsError : undefined}
          noData={!comments.length ? noComments : undefined}
          loading={comments.length === 0 && commentsLoading}
          renderListItem={(comment) => (
            <div className="comment-list-item">
              <ListItemComponent
                key={`comment-${comment.id}`}
                message={helloMessage}
                comment={comment as CommentModel}
              />
            </div>
          )}
        />
      </div>
      {link.next && (
        <ButtonComponent
          className="comments-next-button"
          loading={comments.length > 0 && commentsLoading}
          message={helloMessage}
          title={moreComents}
          onClick={() => {
            fetchData(postId, link.next);
          }}
        />
      )}
    </div>
  );
};
const CommentsListContainer = withHelloMessageLoader(
  CommentsContainer,
  CommentsContainer.name as string
);
export default CommentsListContainer;
