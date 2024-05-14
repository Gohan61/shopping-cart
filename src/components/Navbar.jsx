import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";

export default function NavBar({ cartItem }) {
  let totalAmount = Object.entries(cartItem).map(([id, value]) => {
    return Number(value.items);
  });

  return (
    <>
      <header>
        <h1>The Random Store</h1>
        <nav className="navBar">
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
                  Shopping cart (
                  {totalAmount.length === 0
                    ? 0
                    : totalAmount.reduce((a, b) => a + b)}
                  )
                </Link>
              </li>
            </>
          </ul>
        </nav>
      </header>
    </>
  );
}
