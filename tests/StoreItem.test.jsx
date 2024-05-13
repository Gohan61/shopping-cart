import { render } from "@testing-library/react";
import { describe, expect } from "vitest";
import StoreItem from "../src/components/StoreItem";
import { screen } from "@testing-library/react";

describe("render StoreItem component", () => {
  it("renders props passed to StoreItem", () => {
    const props = {
      title: "Jacket",
      price: 23,
      description: "Nice piece",
      image: "/path",
      id: 0,
    };

    render(<StoreItem props={props}></StoreItem>);

    expect(screen.getByRole("heading").textContent).toMatch("Jacket");
    expect(screen.getByText("€ 23")).toBeInTheDocument();
    expect(screen.getByText("Nice piece")).toBeInTheDocument();
    expect(
      screen.getByRole("spinbutton", { type: "number" })
    ).toBeInTheDocument();
  });
});
