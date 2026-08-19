import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import App from "../../app/App";
import HomeScreen from "../../screens/HomeScreen";
import { store } from "../../store";

vi.mock("../../hooks/useGetProducts", () => ({
  useGetProducts: () => ({
    data: { products: [], pages: 1, page: 1 },
    error: null,
    isLoading: false,
  }),
}));

vi.mock("../../components/ProductCarousel", () => ({
  default: () => null,
}));

describe("App", () => {
  it("renders the app title", () => {
    const queryClient = new QueryClient();

    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={["/"]}>
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<HomeScreen />} />
              </Route>
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>,
    );

    expect(screen.getByText(/latest products/i)).toBeInTheDocument();
  });
});
