import PropTypes from "prop-types";
import { useState } from "react";

function StoreItem({ props, addToCart, cartItem }) {
  const [amount, setAmount] = useState(0);

  return (
    <div className="item">
      <h4>{props.title}</h4>
      <p className="itemPrice">€ {props.price}</p>
      <div className="descImageShop">
        <img src={props.image} alt="" />
        <p className="itemDescription">{props.description}</p>
      </div>
      <div className="amountItem">
        <label htmlFor={props.id}>Amount</label>
        <input
          type="number"
          id={props.id}
          value={amount}
          min={0}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          className="addToCart"
          onClick={() => {
            AddToCart({ props, addToCart, cartItem, amount });
            setAmount(0);
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

function AddToCart({ addToCart, cartItem, props, amount }) {
  let currentAmount = 0;
  if (cartItem[props.id]) {
    currentAmount = cartItem[props.id].items;
  }
  addToCart({
    ...cartItem,
    [props.id]: {
      title: props.title,
      price: props.price,
      items: Number(amount) + Number(currentAmount),
    },
  });
}

StoreItem.propTypes = {
  props: PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    image: PropTypes.any,
    id: PropTypes.number,
    category: PropTypes.string,
    rating: PropTypes.shape({
      rate: PropTypes.number,
      count: PropTypes.number,
    }),
  }),
  addToCart: PropTypes.func,
  cartItem: PropTypes.object,
};

export default StoreItem;
