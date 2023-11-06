import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import LinkWrapComponent from "../LinkWrapComponent";

describe("LinkWrapComponent", () => {
  jest.spyOn(console, "log").mockImplementation(() => {});
  it("renders its children correctly", () => {
    const text = "Child text";
    const to = "/test-path";
    const { getByText } = render(
      <LinkWrapComponent to={to} withLink={false}>
        {text}
      </LinkWrapComponent>
    );
    expect(getByText(text)).toBeInTheDocument();
  });

  it("renders a Link when withLink is true", () => {
    const text = "Child text";
    const to = "/test-path";
    const { getByText } = render(
      <Router>
        <LinkWrapComponent withLink={true} to={to}>
          {text}
        </LinkWrapComponent>
      </Router>
    );

    const linkElement = getByText(text);
    expect(linkElement.closest("a")).toHaveAttribute("href", to);
  });

  it("does not render a Link when withLink is false", () => {
    const text = "Child text";
    const to = "/test-path";
    const { container } = render(
      <LinkWrapComponent to={to} withLink={false}>
        {text}
      </LinkWrapComponent>
    );
    expect(container.querySelector("a")).toBeNull();
  });

  it("calls onClick when the link is clicked", () => {
    const text = "Child text";
    const onClick = jest.fn();
    const { getByText } = render(
      <Router>
        <LinkWrapComponent withLink={true} to="/" onClick={onClick}>
          {text}
        </LinkWrapComponent>
      </Router>
    );

    fireEvent.click(getByText(text));
    expect(onClick).toHaveBeenCalled();
  });
});
