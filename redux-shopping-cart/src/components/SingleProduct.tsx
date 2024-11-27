import { useState } from "react";
import { SingleProductType } from "../types/storeTypes";
import { useDispatch } from "react-redux";
import { addAmount, fetchProduct } from "../features/shoppingCart/cartSlice";
import { AppDispatch } from "../app/store";

export default function SingleProduct({ props }: { props: SingleProductType }) {
  const [inputAmount, setInputAmount] = useState(0);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="item">
      <h4>{props.title}</h4>
      <p className="itemPrice">€ {props.price}</p>
      <div className="descImageShop">
        <img src={props.image} alt="" className="w-10" />
        <p className="itemDescription">{props.description}</p>
      </div>
      <div className="amountItem">
        <label htmlFor={props.id.toString()}>Amount</label>
        <input
          type="number"
          id={props.id.toString()}
          value={inputAmount}
          min={0}
          onChange={(e) => setInputAmount(Number(e.target.value))}
        />
        <button
          className="addToCart"
          onClick={async () => {
            dispatch(addAmount({ inputAmount, id: props.id }));
            setInputAmount(0);
            dispatch(fetchProduct({ id: props.id }));
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
