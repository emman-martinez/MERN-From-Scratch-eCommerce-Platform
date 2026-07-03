import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import App from "../../app/App";
import HomeScreen from "../../screens/HomeScreen";

describe("App", () => {
  it("renders the app title", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomeScreen />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText(/latest products/i)).toBeInTheDocument();
  });
});
