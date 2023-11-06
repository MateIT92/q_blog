import { FC } from "react";
import { CommentModel, PostModel } from "../../adapters/responseModels";
import withHelloMessageLoader from "../util/withHelloMessageLoader";
import "./ListComponent.css";

interface ListProps {
  items: PostModel[] | CommentModel[];
  renderListItem: (item: PostModel | CommentModel) => JSX.Element;
  keyId: string;
}

const List: FC<ListProps> = ({ items, renderListItem, keyId }) => {
  return (
    <div className="list">
      {items.map((item) => (
        <div className="list-item" key={keyId + item.id}>
          {renderListItem(item)}
        </div>
      ))}
    </div>
  );
};

const ListComponent = withHelloMessageLoader(List, List.name as string);
export default ListComponent;
