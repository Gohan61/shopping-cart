import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ShopPage from "../src/components/ShopPage";
import { screen } from "@testing-library/react";

describe("render Shoppage", () => {
  const { cartItem, addToCart } = vi.fn();

  it("renders error page", () => {
    render(
      <Outlet context={[cartItem, addToCart]}>
        <ShopPage />
      </Outlet>
    );

    const error = new Error("server error");

    if (error) {
      return <p>A network error was encountered with error code ${error}</p>;
    }

    expect(screen.getByText(/network error/)).toBeInTheDocument();
  });
});
