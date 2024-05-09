import PropTypes from "prop-types";

function StoreItem({ props, addToCart, cartItem }) {
  return (
    <div className="item">
      <h4>{props.title}</h4>
      <p>{props.price}</p>
      <p>{props.description}</p>
      <img src={props.image} alt="" />
      <div className="amountItem">
        <label htmlFor={props.id}>Amount</label>
        <input type="number" id={props.id} />
        <button
          className="addToCart"
          onClick={() => AddToCart({ props, addToCart, cartItem })}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

function AddToCart({ addToCart, cartItem, props }) {
  addToCart({
    ...cartItem,
    [props.id]: { title: props.title, price: props.price },
  });
}

StoreItem.propTypes = {
  props: PropTypes.object,
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
