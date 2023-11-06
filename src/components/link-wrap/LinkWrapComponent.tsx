import { ReactNode } from "react";
import { Link } from "react-router-dom";
import withHelloMessageLoader from "../util/withHelloMessageLoader";
import "./LinkWrapComponent.css";

interface LinkWrapProps {
  withLink: boolean;
  to: string;
  children: ReactNode;
  onClick?: () => void;
}

const LinkWrap: React.FC<LinkWrapProps> = ({
  withLink,
  to,
  children,
  onClick,
}) => {
  return withLink ? (
    <Link className="link-wrap" onClick={onClick} to={to}>
      {children}
    </Link>
  ) : (
    <>{children}</>
  );
};

const LinkWrapComponent = withHelloMessageLoader(
  LinkWrap,
  LinkWrap.name as string
);
export default LinkWrapComponent;
