import { useState } from "react";

export default function ShoppingCart({ cartItem }) {
  let totalCurrent = Object.entries(cartItem).map(
    ([id, value]) => value.price * Number(value.items)
  );

  return (
    <>
      <h3>Items in your shopping cart</h3>
      <div className="shoppingCart">
        {Object.entries(cartItem).map(([id, value]) => {
          return (
            <div className="shoppingCartItem" key={id}>
              <h4>{value.title}</h4>
              <p>
                <span>Price </span>
                {value.price * Number(value.items)}
              </p>
              <p>
                <span>Amount </span>
                {value.items}
              </p>
            </div>
          );
        })}
        <p>
          <span>Total price: </span>
          {totalCurrent.reduce((a, b) => a + b)}
        </p>
      </div>
    </>
  );
}
