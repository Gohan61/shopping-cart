import { useEffect, useState } from "react";
import StoreItem from "./StoreItem";
import { useOutletContext } from "react-router-dom";
import "../styles/ShopPage.css";

export default function ShopPage() {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const storeURL = "https://fakestoreapi.com/products/";
  const [cartItem, addToCart] = useOutletContext();

  useEffect(() => {
    fetch(storeURL, { mode: "cors" })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((response) => {
        setProduct(response);
        console.log(response);
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, [storeURL]);

  if (loading) {
    return <p>Loading</p>;
  }
  return (
    <>
      <h1>Shop Page</h1>
      <div className="storeContainer">
        <StoreItem
          props={product[1]}
          addToCart={addToCart}
          cartItem={cartItem}
        ></StoreItem>
        <StoreItem
          props={product[2]}
          addToCart={addToCart}
          cartItem={cartItem}
        ></StoreItem>
      </div>
    </>
  );
}
