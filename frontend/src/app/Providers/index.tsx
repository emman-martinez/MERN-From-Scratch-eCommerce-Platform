import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { router } from "../Router";
import { store } from "../../store";

const queryClient = new QueryClient();

export function AppProviders() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  );
}
