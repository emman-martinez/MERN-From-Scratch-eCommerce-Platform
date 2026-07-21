import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { router } from "../Router";
import { store } from "../../store";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

export function AppProviders() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PayPalScriptProvider deferLoading={true}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </PayPalScriptProvider>
      </QueryClientProvider>
    </Provider>
  );
}
