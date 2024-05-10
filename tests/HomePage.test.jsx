import { render, screen } from "@testing-library/react";
import HomePage from "../src/components/HomePage";
import { describe, expect, it, test } from "vitest";

describe("Home page component", () => {
  it("renders homepage elements", () => {
    render(<HomePage />);
    expect(screen.getByText("Welcome to the Random Store")).toBeInTheDocument();
    expect(screen.getByText("For all your random needs")).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByText(/stumble on to something/)).toBeInTheDocument();
  });
});
