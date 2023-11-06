import { render } from "@testing-library/react";
import LayoutContainer from "../LayoutContainer";

jest.mock("../../header/HeaderComponent", () => {
  return {
    __esModule: true,
    default: () => <div data-testid="mock-header">HeaderComponent</div>,
  };
});

describe("LayoutContainer", () => {
  jest.spyOn(console, "log").mockImplementation(() => {});
  it("renders its children", () => {
    const childText = "Child content";
    const { getByText } = render(
      <LayoutContainer>
        <div>{childText}</div>
      </LayoutContainer>
    );

    expect(getByText(childText)).toBeTruthy();
  });

  it("renders the HeaderComponent", () => {
    const { getByTestId } = render(
      <LayoutContainer>
        <div />
      </LayoutContainer>
    );

    expect(getByTestId("mock-header")).toBeTruthy();
  });
});
