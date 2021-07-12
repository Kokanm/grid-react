import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders app title screen", () => {
  render(<App />);
  const linkElement = screen.getByText(/chess grid/i);
  expect(linkElement).toBeInTheDocument();
});
