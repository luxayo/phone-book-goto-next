import { render, screen, fireEvent, act } from "@testing-library/react";
import {
  useGetContactListLazyQuery,
  useDeleteContactMutation,
} from "@api/generated";
import Contact from "@/pages/contact/index.page";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/api/generated", () => ({
  useGetContactListLazyQuery: jest.fn(),
  useDeleteContactMutation: jest.fn(),
}));

describe("Contact Component", () => {
  const mockUseGetContactListLazyQuery =
    useGetContactListLazyQuery as jest.Mock;
  const mockUseDeleteContactMutation = useDeleteContactMutation as jest.Mock;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("renders initially", async () => {
    const mockContactList = {
      contact: [],
    };

    const mockGetContact = jest
      .fn()
      .mockResolvedValue({ data: mockContactList });

    mockUseDeleteContactMutation.mockReturnValue([
      jest.fn(),
      { loading: false },
    ]);

    mockUseGetContactListLazyQuery.mockReturnValue([
      mockGetContact,
      { loading: false },
    ]);

    await act(async () => render(<Contact />));

    expect(mockGetContact).toHaveBeenCalledWith({
      variables: expect.objectContaining({ limit: 10, offset: 0 }),
    });
  });

  it("renders contact list", async () => {
    const mockContactList = {
      contact: [
        {
          created_at: "2023-08-27T17:50:49.558549+00:00",
          first_name: "Alexander",
          id: 5446,
          last_name: "",
          phones: [{ number: "08123123", __typename: "phone" }],
          __typename: "contact",
        },
        {
          created_at: "2023-08-27T18:03:41.261039+00:00",
          first_name: "Alex",
          id: 5456,
          last_name: "",
          phones: [{ number: "081999213", __typename: "phone" }],
          __typename: "contact",
        },
      ],
    };

    mockUseDeleteContactMutation.mockReturnValue([
      jest.fn(),
      { loading: false },
    ]);

    const mockGetContact = jest.fn();
    mockUseGetContactListLazyQuery.mockReturnValue([
      mockGetContact,
      { loading: false },
    ]);

    window.localStorage.setItem("contact", JSON.stringify(mockContactList));

    await act(async () => render(<Contact />));

    const contactCards = await screen.findAllByTestId("card-container");
    expect(contactCards).toHaveLength(mockContactList.contact.length);
  });

  it("should render contact list after state change", async () => {
    const mockContactList = {
      contact: [
        {
          created_at: "2023-08-27T17:50:49.558549+00:00",
          first_name: "Alep",
          id: 5466,
          last_name: "",
          phones: [{ number: "09123123", __typename: "phone" }],
          __typename: "contact",
        },
      ],
    };

    mockUseDeleteContactMutation.mockReturnValue([
      jest.fn(),
      { loading: false },
    ]);

    const mockGetContact = jest
      .fn()
      .mockResolvedValue({ data: mockContactList });

    mockUseGetContactListLazyQuery.mockReturnValue([
      mockGetContact,
      { loading: false },
    ]);
    const data = window.localStorage.getItem("contact");

    expect(data).not.toBeNull();

    const parsed = JSON.parse(data!) as {
      contact: {
        created_at: string;
        first_name: string;
        id: number;
        last_name: string;
        phones: {
          number: string;
          __typename: string;
        }[];
        __typename: string;
      }[];
    };

    const { unmount } = await act(async () => render(<Contact />));

    await act(async () => {
      const button = await screen.findByTestId("load-more");
      fireEvent.click(button);
      window.localStorage.setItem(
        "contact",
        JSON.stringify({
          contact: parsed.contact.concat(mockContactList.contact),
        })
      );
      unmount();
    });

    render(<Contact />);

    const contactCards = await screen.findAllByTestId("card-container");

    expect(contactCards).toHaveLength(3);
  });
});
