import { render, screen } from "@testing-library/react";
import App from "../App";

test("if the screen", () => {
  render(<App />);
  const linkElement = screen.getByText(/Select a Mentor/i);
  expect(linkElement).toBeInTheDocument();
});