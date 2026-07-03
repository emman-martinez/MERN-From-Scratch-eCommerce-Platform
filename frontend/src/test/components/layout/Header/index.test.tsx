import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "../../../../components/layout/Header";

describe("Header", () => {
  it("renders the brand and navigation links", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByRole("img", { name: /proshop/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /proshop/i })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /cart/i })).toHaveAttribute("href", "/cart");
    expect(screen.getByRole("link", { name: /sign in/i })).toHaveAttribute("href", "/login");
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
