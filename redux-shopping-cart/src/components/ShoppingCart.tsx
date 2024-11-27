import { useSelector } from "react-redux";
import { CartStateType } from "../types/storeTypes";

export default function ShoppingCart() {
  const productsInCart = useSelector((state: CartStateType) => state.cart);

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
          </div>
        );
      })}
    </div>
  );
}
