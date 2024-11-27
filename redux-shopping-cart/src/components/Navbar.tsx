import ShoppingCart from "./ShoppingCart";
import { useState } from "react";

export default function Navbar() {
  const [displayCart, setDisplayCart] = useState(false);

  return (
    <nav>
      <button onClick={() => setDisplayCart(!displayCart)}>
        Shopping Cart
      </button>
      {displayCart ? <ShoppingCart></ShoppingCart> : ""}
    </nav>
  );
}
