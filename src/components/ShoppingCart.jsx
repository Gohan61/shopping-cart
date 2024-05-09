export default function ShoppingCart({ cartItem }) {
  return (
    <>
      <h3>Items in your shopping cart</h3>
      <div className="shoppingCart">
        {Object.entries(cartItem).map(([id, value]) => {
          console.log(id, value);

          return (
            <div className="shoppingCartItem" key={id}>
              <h4>{value.title}</h4>
              <p>
                <span>Price </span>
                {value.price * Number(value.items)}
              </p>
              <p>
                <span>Amount </span>
                {value.items}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}
