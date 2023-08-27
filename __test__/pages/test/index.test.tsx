import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TestPage from "@/pages/test/index.page";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("TestPage", () => {
  it("renders a heading", () => {
    render(<TestPage />);

    const heading = screen.getByRole("heading", {
      name: /TestPage/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
