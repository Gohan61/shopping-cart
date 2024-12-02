import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import store from "../../app/store";
import { fetchAllProducts } from "./productSlice";
import SingleProduct from "../../components/SingleProduct";
import { ProductStateApi, SingleProductType } from "../../types/storeTypes";
import { AppDispatch } from "../../app/store";
import { currentPage } from "../paginator/pageSlice";
import Paginator from "../../components/Paginator";

export default function AllProducts() {
  const allProducts = useSelector((state: ProductStateApi) => state.product);
  const currentData = useSelector(
    (state: { page: { currentData: SingleProductType[] } }) =>
      state.page.currentData
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllProducts()).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        const state = store.getState();
        dispatch(
          currentPage({ currentPage: 1, products: state.product.products })
        );
      }
      setLoading(false);
    });
  }, []);
  const [loading, setLoading] = useState(true);

  return (
    <>
      <div>
        <h1>All products in our store</h1>
        {allProducts.loading ? <p>Loading</p> : ""}
        {allProducts.error ? <p>{allProducts.error}</p> : ""}
        {loading
          ? "Loading"
          : currentData.map((item) => {
              return <SingleProduct props={item} key={item.id + "product"} />;
            })}
        {!productFetch.loading && (
      <Paginator
        props={{
              loading: allProducts.loading,
          dataLength: allProducts.products.length,
          currentData: allProducts.products,
        }}
      ></Paginator>
        )}
      </div>
    </>
  );
}
