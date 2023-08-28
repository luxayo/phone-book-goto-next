import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { useAddContactWithPhonesMutation } from "@api/generated";
import NewContact from "@/pages/contact/new/index.page";
import "@testing-library/jest-dom";
import { Router, useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
  Router: jest.fn(),
}));

jest.mock("@/api/generated", () => ({
  useAddContactWithPhonesMutation: jest.fn(),
}));

describe("NewContact Component", () => {
  const mockUseAddContactWithPhonesMutation =
    useAddContactWithPhonesMutation as jest.Mock;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should render the component", async () => {
    mockUseAddContactWithPhonesMutation.mockReturnValue([
      jest.fn(),
      { loading: false },
    ]);

    await act(async () => render(<NewContact />));

    expect(await screen.findByTestId("first-name")).toBeInTheDocument();
    expect(await screen.findByTestId("last-name")).toBeInTheDocument();
    expect(await screen.findByTestId("phone")).toBeInTheDocument();
  });

  it('should add a phone field when "Add Phone Field" button is clicked', async () => {
    mockUseAddContactWithPhonesMutation.mockReturnValue([
      jest.fn(),
      { loading: false },
    ]);

    await act(async () => render(<NewContact />));

    await act(async () => {
      const button = await screen.findByTestId("add-phone");
      fireEvent.click(button);
    });

    expect(await screen.findAllByTestId("phone")).toHaveLength(2);
  });
});
