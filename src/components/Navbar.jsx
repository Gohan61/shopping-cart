import { useState } from "react";
import { Link } from "react-router-dom";
import ShoppingCart from "./ShoppingCart";

export default function NavBar({ cartItem }) {
  let totalAmount = Object.entries(cartItem).map(([id, value]) => {
    return Number(value.items);
  });

  return (
    <>
      <nav>
        <h3>Navigation</h3>
        <ul>
          <>
            <li>
              <Link to={"homepage"}>Home page</Link>
            </li>
            <li>
              <Link to={"shoppage"}>Shop page</Link>
            </li>
            <li>
              <Link to={"shopcart"}>
                Shopping cart ({totalAmount.reduce((a, b) => a + b)})
              </Link>
            </li>
          </>
        </ul>
      </nav>
    </>
  );
}
