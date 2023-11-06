import { render, fireEvent, screen } from "@testing-library/react";
import ButtonComponent from "../ButtonComponent";

describe("ButtonComponent", () => {
  jest.spyOn(console, "log").mockImplementation(() => {});

  const mockOnClick = jest.fn();
  const props = {
    title: "Click Me",
    onClick: mockOnClick,
    className: "test-class",
  };

  it("renders the button with the correct title", () => {
    render(<ButtonComponent {...props} />);
    expect(screen.getByRole("button", { name: "Click Me" })).not.toBeNull();
  });

  it("calls the onClick handler when clicked", () => {
    render(<ButtonComponent {...props} />);
    fireEvent.click(screen.getByText("Click Me"));
    expect(mockOnClick).toHaveBeenCalled();
  });

  it("is disabled when the disabled prop is true", () => {
    render(<ButtonComponent {...props} disabled />);
    const button = screen.getByText("Click Me");
    expect(button.hasAttribute("disabled")).toBeTruthy();
  });

  it("shows a loader when loading is true", () => {
    const { container } = render(<ButtonComponent {...props} loading />);
    const loader = container.querySelector(".loader");
    expect(loader).not.toBeNull();
  });

  it("shows an error message when error is provided", () => {
    const errorMessage = "Error!";
    render(<ButtonComponent {...props} error={errorMessage} />);
    expect(screen.getByText(errorMessage)).not.toBeNull();
  });

  it("shows a no data message when noData is provided", () => {
    const noDataMessage = "No data available";
    render(<ButtonComponent {...props} noData={noDataMessage} />);
    expect(screen.getByText(noDataMessage)).not.toBeNull();
  });

  it("logs the message and component name on mount", () => {
    const message = "Hello";
    render(<ButtonComponent {...props} message={message} />);
    expect(console.log).toHaveBeenCalledWith(`${message} Button`);
  });
});
