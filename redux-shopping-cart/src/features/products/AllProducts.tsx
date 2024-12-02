import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import store from "../../app/store";
import { fetchSingleCategory, fetchSortedProducts } from "./productSlice";
import SingleProduct from "../../components/SingleProduct";
import {
  categoryState,
  ProductStateApi,
  SingleProductType,
} from "../../types/storeTypes";
import { AppDispatch } from "../../app/store";
import { currentPage } from "../paginator/pageSlice";
import Paginator from "../../components/Paginator";

export default function AllProducts({
  sortProduct,
  setSortProduct,
}: {
  sortProduct: string;
  setSortProduct: React.Dispatch<React.SetStateAction<string>>;
}) {
  const allProducts = useSelector((state: ProductStateApi) => state.product);
  const productFetch = useSelector(
    (state: { category: categoryState }) => state.category
  );

  const currentData = useSelector(
    (state: { page: { currentData: SingleProductType[] } }) =>
      state.page.currentData
  );
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true);

  function selectSort(e: React.ChangeEvent<HTMLSelectElement>) {
    return e.target.value === "asc"
      ? (dispatchSorted("asc", productFetch.currentCategory),
        setSortProduct("asc"))
      : (dispatchSorted("desc", productFetch.currentCategory),
        setSortProduct("desc"));
  }

  function dispatchSorted(sort: string, category: string) {
    if (sort === "desc") {
      dispatch(fetchSortedProducts({ category })).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          const state = store.getState();
          dispatch(
            currentPage({ currentPage: 1, products: state.product.products })
          );
        }
        setLoading(false);
      });
    } else {
      dispatch(fetchSingleCategory({ category })).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          const state = store.getState();
          dispatch(
            currentPage({ currentPage: 1, products: state.product.products })
          );
        }
        setLoading(false);
      });
    }
  }

  return (
    <>
      <div>
        <h1>All products in our store</h1>
        <form action="">
          <select
            name="sort"
            id="sort"
            value={sortProduct}
            onChange={(e) => selectSort(e)}
          >
            <option value="asc">asc</option>
            <option value="desc">desc</option>
          </select>
        </form>
        {productFetch.loading ? <p>Loading</p> : ""}
        {productFetch.error ? <p>{productFetch.error}</p> : ""}
        {!productFetch.loading &&
          currentData.map((item) => {
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
