import TestPage from "@/pages/test/index.page";
import { render } from "@testing-library/react";

it("renders TestPage unchanged", () => {
  const { container } = render(<TestPage />);
  expect(container).toMatchSnapshot();
});
