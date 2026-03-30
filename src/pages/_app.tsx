import type { AppType } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "../utils/trpc";
import { useState } from "react";
import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
};

// Wrap your app with tRPC context
export default trpc.withTRPC(MyApp);