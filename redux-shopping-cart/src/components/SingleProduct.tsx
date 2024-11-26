import { SingleProductType } from "../types/storeTypes";

export default function SingleProduct({ props }: { props: SingleProductType }) {
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
          //   value={amount}
          min={0}
          //   onChange={(e) => setAmount(e.target.value)}
        />
        <button
          className="addToCart"
          //   onClick={() => {
          //     AddToCart({ props, addToCart, cartItem, amount });
          //     setAmount(0);
          //   }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
