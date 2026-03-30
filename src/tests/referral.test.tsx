import { render, screen } from "@testing-library/react";
import ReferralPage from './../pages/index';

// Mock tRPC to prevent loading superjson / server code
jest.mock("../utils/trpc", () => ({
  trpc: {
    referral: {
      submitReferral: {
        useMutation: () => ({
          mutate: jest.fn(),
          isPending: false,
        }),
      },
    },
  },
}));

test("renders referral page title", () => {
  render(<ReferralPage />);

  expect(screen.getByText("Patient Referral Form")).toBeInTheDocument();
});