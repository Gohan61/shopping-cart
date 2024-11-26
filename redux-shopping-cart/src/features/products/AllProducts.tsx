import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "./productSlice";
import SingleProduct from "../../components/SingleProduct";
import { ProductStateApi } from "../../types/storeTypes";
import { AppDispatch } from "../../app/store";

export default function AllProducts() {
  const allProducts = useSelector((state: ProductStateApi) => state.product);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  return (
    <div>
      <h1>All products in our store</h1>
      {allProducts.loading ? <p>Loading</p> : ""}
      {allProducts.error ? <p>{allProducts.error}</p> : ""}
      {allProducts.products.map((item) => {
        return <SingleProduct props={item} />;
      })}
    </div>
  );
}
