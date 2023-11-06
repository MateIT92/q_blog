import { render, fireEvent, screen } from "@testing-library/react";
import HeaderComponent from "../HeaderComponent";
import { BrowserRouter as Router } from "react-router-dom";
import { useBlogGlobalContext } from "../../../context/BlogGlobalContextProvider";
import { JSX } from "react/jsx-runtime";

jest.mock("../../../utils/utilMessages", () => ({
  headerTitle: "Test Title",
  helloMessage: "Hello Test",
}));

jest.mock("../../../context/BlogGlobalContextProvider", () => ({
  useBlogGlobalContext: jest.fn(),
}));

const mockToggleRefreshData = jest.fn();

const renderWithRouter = (component: JSX.Element) => {
  return render(<Router>{component}</Router>);
};
jest.spyOn(console, "log").mockImplementation(() => {});
describe("HeaderComponent", () => {
  beforeEach(() => {
    mockToggleRefreshData.mockReset();
    (useBlogGlobalContext as jest.Mock).mockImplementation(() => ({
      toggleRefreshData: mockToggleRefreshData,
    }));

    Object.defineProperty(window, "location", {
      value: new URL("http://localhost/"),
      writable: true,
    });
  });

  it("renders the header title", () => {
    renderWithRouter(<HeaderComponent />);
    expect(screen.getByText("Test Title")).toBeTruthy();
  });

  it('calls "toggleRefreshData" when logo is clicked and path is root', () => {
    renderWithRouter(<HeaderComponent />);
    fireEvent.click(screen.getByText("Test Title"));
    expect(mockToggleRefreshData).toHaveBeenCalled();
  });

  it('does not call "toggleRefreshData" when logo is clicked and path is not root', () => {
    Object.defineProperty(window.location, "pathname", {
      value: "/other-path",
      writable: true,
    });
    renderWithRouter(<HeaderComponent />);
    fireEvent.click(screen.getByText("Test Title"));
    expect(mockToggleRefreshData).not.toHaveBeenCalled();
  });
});
