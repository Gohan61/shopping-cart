import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import "../styles/ShoppingCart.css";
import { PropTypes } from "prop-types";

export default function ShoppingCart() {
  const [cartItem, addToCart] = useOutletContext();
  const [totalCurrent, setTotalCurrent] = useState(null);

  if (Object.keys(cartItem).length === 0) {
    return <h1>Your cart is empty</h1>;
  } else
    return (
      <>
        <h1>Items in your shopping cart</h1>
        <div className="shoppingCart">
          {Object.entries(cartItem).map(([id, value]) => {
            return (
              <>
                <CartItem
                  id={id}
                  value={value}
                  addToCart={addToCart}
                  cartItem={cartItem}
                ></CartItem>
              </>
            );
          })}
          <p className="totalPrice">
            <span>Total price: </span>€ {totalCurrent}
            <button
              onClick={() =>
                setTotalCurrent(
                  Object.entries(cartItem)
                    .map(([id, value]) => value.price * Number(value.items))
                    .reduce((a, b) => a + b)
                    .toFixed(2)
                )
              }
            >
              Calculate total price
            </button>
          </p>
        </div>
      </>
    );
}

function CartItem({ id, value, addToCart, cartItem }) {
  const [editState, setEditState] = useState(false);
  const [amount, setAmount] = useState(0);

  return (
    <div className="shoppingCartItem" key={id}>
      <h2>{value.title}</h2>

      <p className="cartItemPrice">
        <span>Price </span>€ {value.price * Number(value.items)}
      </p>

      {!editState ? (
        <p className="cartItemAmount">
          <span className="cartItemAmountSpan">Amount </span>
          {value.items}
          <button
            onClick={() => {
              setAmount(value.items);
              setEditState(true);
            }}
            key={id}
          >
            Edit
          </button>
        </p>
      ) : (
        <>
          <p className="cartItemAmount">
            <span className="cartItemAmountSpan">Amount </span>
            <input
              type="number"
              value={amount}
              min={0}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button
              onClick={() => {
                addToCart({
                  ...cartItem,
                  [id]: { ...cartItem[id], items: amount },
                });
                setEditState(false);
              }}
              key={id}
            >
              Submit
            </button>
          </p>
        </>
      )}
    </div>
  );
}

CartItem.propTypes = {
  id: PropTypes.number,
  value: PropTypes.object,
  addToCart: PropTypes.func,
  cartItem: PropTypes.object,
};
