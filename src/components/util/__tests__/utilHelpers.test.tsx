import { extractNextLink } from "../utilHelpers";

describe("extractNextLink", () => {
  it("extracts the next link when present", () => {
    const linkHeader =
      '<https://api.example.com/items?page=2>; rel="next", <https://api.example.com/items?page=1>; rel="prev"';
    const result = extractNextLink(linkHeader);
    expect(result.next).toBe("https://api.example.com/items?page=2");
  });

  it("returns undefined when the next link is not present", () => {
    const linkHeader = '<https://api.example.com/items?page=1>; rel="prev"';
    const result = extractNextLink(linkHeader);
    expect(result.next).toBeUndefined();
  });

  it("handles empty link headers", () => {
    const linkHeader = "";
    const result = extractNextLink(linkHeader);
    expect(result.next).toBeUndefined();
  });

  it("returns undefined when the link header is not provided", () => {
    const result = extractNextLink();
    expect(result.next).toBeUndefined();
  });
});
