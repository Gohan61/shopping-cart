import { useDispatch, useSelector } from "react-redux";
import { CartStateType } from "../types/storeTypes";
import {
  addAmount,
  reduceAmount,
  fetchProduct,
  removeFromCart,
} from "../features/shoppingCart/cartSlice";
import { AppDispatch } from "../app/store";

export default function ShoppingCart() {
  const productsInCart = useSelector((state: CartStateType) => state.cart);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
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
    </div>
  );
}
