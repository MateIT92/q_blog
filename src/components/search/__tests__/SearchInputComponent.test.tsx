import { render, fireEvent, screen } from "@testing-library/react";
import { useBlogGlobalContext } from "../../../context/BlogGlobalContextProvider";
import SearchInputComponent from "../SearchInputComponent";
import { searchInputPlaceholder } from "../../../utils/utilMessages";

jest.mock("../../../context/BlogGlobalContextProvider", () => ({
  useBlogGlobalContext: jest.fn(),
}));

const mockToggleSearchActive = jest.fn();

describe("<SearchInputComponent />", () => {
  jest.spyOn(console, "log").mockImplementation(() => {});
  beforeEach(() => {
    (useBlogGlobalContext as jest.Mock).mockImplementation(() => ({
      searchTerm: "",
      toggleSearchActive: mockToggleSearchActive,
    }));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders without crashing", () => {
    render(<SearchInputComponent />);
    expect(
      screen.getByPlaceholderText(searchInputPlaceholder)
    ).toBeInTheDocument();
  });

  it("enables input and button when searchTerm is empty", () => {
    render(<SearchInputComponent />);
    expect(screen.getByRole("textbox")).not.toBeDisabled();
    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  it("disables input and button when searchTerm is not empty", () => {
    (useBlogGlobalContext as jest.Mock).mockImplementation(() => ({
      searchTerm: "test",
      toggleSearchActive: mockToggleSearchActive,
    }));

    render(<SearchInputComponent />);
    expect(screen.getByRole("textbox")).toBeDisabled();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("handles input change", () => {
    render(<SearchInputComponent />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "test query" } });
    expect(input.value).toBe("test query");
  });

  it("calls toggleSearchActive and clears input on Enter key press", () => {
    render(<SearchInputComponent />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "test query" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(mockToggleSearchActive).toHaveBeenCalledWith("test query");
    expect(input.value).toBe("");
  });

  it("calls toggleSearchActive and clears input on button click", () => {
    render(<SearchInputComponent />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "test query" } });
    fireEvent.click(screen.getByRole("button"));
    expect(mockToggleSearchActive).toHaveBeenCalledWith("test query");
    expect(input.value).toBe("");
  });
});
