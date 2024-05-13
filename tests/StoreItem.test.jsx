import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import StoreItem from "../src/components/StoreItem";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { func } from "prop-types";

describe("render StoreItem component", () => {
  const props = {
    title: "Jacket",
    price: 23,
    description: "Nice piece",
    image: "/path",
    id: 0,
  };
  const cartItemTest = { 1: { items: 1 } };

  function addToCart() {
    return cartItemTest;
  }

  it("renders props passed to StoreItem", () => {
    render(<StoreItem props={props}></StoreItem>);

    expect(screen.getByRole("heading").textContent).toMatch("Jacket");
    expect(screen.getByText("€ 23")).toBeInTheDocument();
    expect(screen.getByText("Nice piece")).toBeInTheDocument();
    expect(
      screen.getByRole("spinbutton", { type: "number" })
    ).toBeInTheDocument();
  });

  it("clears screen after add to cart", async () => {
    render(
      <StoreItem props={props} cartItem={cartItemTest} addToCart={addToCart} />
    );

    const user = userEvent.setup();

    const button = screen.getByRole("button", { name: "Add to cart" });

    await user.click(button);

    expect(screen.getByRole("heading").textContent).toMatch("");
  });
});
