import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Header from "../../../../components/layout/Header";
import { store } from "../../../../store";

describe("Header", () => {
  it("renders the brand and navigation links", () => {
    const queryClient = new QueryClient();

    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <Header />
          </MemoryRouter>
        </QueryClientProvider>
      </Provider>,
    );

    expect(screen.getByRole("img", { name: /proshop/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /proshop/i })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /cart/i })).toHaveAttribute("href", "/cart");
    expect(screen.getByRole("link", { name: /sign in/i })).toHaveAttribute("href", "/login");
    expect(screen.getByRole("button", { name: /toggle navigation/i })).toBeInTheDocument();
  });
});
