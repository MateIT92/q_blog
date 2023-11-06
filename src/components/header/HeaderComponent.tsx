import { FC } from "react";
import { headerTitle, helloMessage, refresh } from "../../utils/utilMessages";
import withHelloMessageLoader from "../util/withHelloMessageLoader";
import SearchInputComponent from "../search/SearchInputComponent";
import LinkWrapComponent from "../link-wrap/LinkWrapComponent";
import { useBlogGlobalContext } from "../../context/BlogGlobalContextProvider";
import "./HeaderComponent.css";

const Header: FC = () => {
  const { toggleRefreshData } = useBlogGlobalContext();

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      toggleRefreshData(refresh);
    }
  };

  return (
    <div className="layout-header">
      <LinkWrapComponent
        message={helloMessage}
        withLink={true}
        to={`/`}
        onClick={handleLogoClick}
      >
        <h1>{headerTitle}</h1>
      </LinkWrapComponent>
      <SearchInputComponent message={helloMessage} />
    </div>
  );
};
const HeaderComponent = withHelloMessageLoader(Header, Header.name as string);
export default HeaderComponent;
