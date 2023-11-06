import { FC, PropsWithChildren } from "react";
import { helloMessage } from "../../utils/utilMessages";
import withHelloMessageLoader from "../util/withHelloMessageLoader";
import HeaderComponent from "../header/HeaderComponent";
import "./LayoutContainer.css";

const LayoutContainerComponent: FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  return (
    <section className={"layout-container"}>
      <HeaderComponent message={helloMessage} />
      <main className={"layout-main"}>{children}</main>
    </section>
  );
};

const LayoutContainer = withHelloMessageLoader(
  LayoutContainerComponent,
  LayoutContainerComponent.name as string
);
export default LayoutContainer;
