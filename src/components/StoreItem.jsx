import PropTypes from "prop-types";

function StoreItem({ props }) {
  return (
    <div className="item">
      <h4>{props.title}</h4>
      <p>{props.price}</p>
      <p>{props.description}</p>
      <img src={props.image} alt="" />
    </div>
  );
}

StoreItem.propTypes = {
  props: PropTypes.object,
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
