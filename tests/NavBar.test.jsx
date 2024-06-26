import { render, screen } from "@testing-library/react";
import "../src/components/Navbar";
import { describe, expect } from "vitest";
import NavBar from "../src/components/Navbar";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { exact } from "prop-types";

describe("Navbar component", () => {
  it("renders navbar correct", () => {
    const cartItemTest = { 1: { items: 1 } };
    render(<NavBar cartItem={cartItemTest} />, { wrapper: BrowserRouter });

    expect(screen.getByText(/Home page/)).toBeInTheDocument();
    expect(screen.getByText(/Shop page/)).toBeInTheDocument();
    expect(
      screen.getByText("Shopping cart (1)", { exact: false })
    ).toBeInTheDocument();
  });
});
