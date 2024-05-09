import { useEffect, useState } from "react";
import StoreItem from "./StoreItem";

export default function ShopPage() {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/", { mode: "cors" })
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
  }, []);

  if (loading) {
    return <p>Loading</p>;
  }
  return (
    <>
      <h1>Shop Page</h1>
      <div className="storeContainer">
        <StoreItem props={product[1]}></StoreItem>
        <StoreItem props={product[2]}></StoreItem>
      </div>
    </>
  );
}
