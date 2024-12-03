import { useDispatch, useSelector } from "react-redux";
import { CartStateType } from "../types/storeTypes";
import {
  addAmount,
  reduceAmount,
  fetchProduct,
  removeFromCart,
  selectTotalCheckout,
} from "../features/shoppingCart/cartSlice";
import { AppDispatch } from "../app/store";
import React from "react";

export default function ShoppingCart({
  displayCartRef,
}: {
  displayCartRef: React.RefObject<HTMLDivElement>;
}) {
  const productsInCart = useSelector((state: CartStateType) => state.cart);
  const totalCheckout = useSelector(() => selectTotalCheckout(productsInCart));
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div
      ref={displayCartRef}
      className="absolute p-2 bg-white w-52 right-2 top-11 border-2 md:top-16 lg:top-12  rounded border-double border-orange-500"
    >
      {Object.keys(productsInCart).map((product: string) => {
        const productId = Number(product);
        return (
          <div key={product}>
            <h3>{productsInCart[productId].title}</h3>
            <p>{productsInCart[productId].amount}</p>
            <p>
              <span>Price: </span>
              {productsInCart[productId].totalPrice}
            </p>
            <button
              onClick={() => {
                dispatch(addAmount({ id: productId, inputAmount: 1 }));
                dispatch(fetchProduct({ id: productId }));
              }}
            >
              +
            </button>
            <button
              onClick={() => {
                dispatch(reduceAmount({ id: productId }));
                dispatch(fetchProduct({ id: productId }));
              }}
            >
              -
            </button>
            <button onClick={() => dispatch(removeFromCart({ id: productId }))}>
              Remove
            </button>
          </div>
        );
      })}
      <p>
        <span>Total:</span>
        {totalCheckout}
      </p>
    </div>
  );
}
