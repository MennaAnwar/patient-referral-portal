import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ReferralPage from "../pages/index";
import { trpc } from "../utils/trpc";

// Mock the TRPC mutation
jest.mock("../utils/trpc", () => ({
  trpc: {
    referral: {
      submitReferral: {
        useMutation: jest.fn(() => ({
          mutate: jest.fn((data: any, options: any) => {
            // Simulate success callback
            options?.onSuccess?.();
          }),
          isPending: false,
        })),
      },
    },
  },
}));

describe("ReferralPage", () => {
  test("renders the page title", () => {
    render(<ReferralPage />);
    expect(screen.getByText("Patient Referral Form")).toBeInTheDocument();
  });


  test("renders the submit button", () => {
    render(<ReferralPage />);
    const button = screen.getByRole("button", { name: /submit referral/i });
    expect(button).toBeInTheDocument();
  });


  test("accepts input and updates value", () => {
    render(<ReferralPage />);

    const firstName = screen.getByPlaceholderText("First Name") as HTMLInputElement;
    fireEvent.change(firstName, { target: { value: "John" } });
    expect(firstName.value).toBe("John");

    const lastName = screen.getByPlaceholderText("Last Name") as HTMLInputElement;
    fireEvent.change(lastName, { target: { value: "Doe" } });
    expect(lastName.value).toBe("Doe");
  });

  test("renders clinic location options", () => {
    render(<ReferralPage />);
    const select = screen.getByRole("combobox");
    expect(select).toHaveTextContent("Anaheim");
    expect(select).toHaveTextContent("Culver City");
    expect(select).toHaveTextContent("Downey");
    expect(select).toHaveTextContent("El Monte");
    expect(select).toHaveTextContent("Long Beach");
    expect(select).toHaveTextContent("Los Angeles");
  });

});