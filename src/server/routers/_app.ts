import { initTRPC } from "@trpc/server";
import { referralRouter } from "./referral";

const t = initTRPC.create();

export const appRouter = t.router({
  referral: referralRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;