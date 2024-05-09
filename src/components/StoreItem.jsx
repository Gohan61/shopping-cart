import PropTypes from "prop-types";
import { useState } from "react";

function StoreItem({ props, addToCart, cartItem }) {
  const [amount, setAmount] = useState(0);

  return (
    <div className="item">
      <h4>{props.title}</h4>
      <p>{props.price}</p>
      <p>{props.description}</p>
      <img src={props.image} alt="" />
      <div className="amountItem">
        <label htmlFor={props.id}>Amount</label>
        <input
          type="number"
          id={props.id}
          value={amount}
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
  props: PropTypes.objectOf(
    PropTypes.shape({
      title: PropTypes.string,
      price: PropTypes.number,
      description: PropTypes.string,
      image: PropTypes.any,
      id: PropTypes.number,
      category: PropTypes.string,
      rating: PropTypes.objectOf(
        PropTypes.shape({
          rate: PropTypes.number,
          count: PropTypes.number,
        })
      ),
    })
  ),
  addToCart: PropTypes.func,
  cartItem: PropTypes.object,
};

// StoreItem.propTypes = {
//   props: PropTypes.shape({
//     title: PropTypes.string,
//     price: PropTypes.number,
//     description: PropTypes.string,
//     image: PropTypes.any,
//   }),
// };

export default StoreItem;
