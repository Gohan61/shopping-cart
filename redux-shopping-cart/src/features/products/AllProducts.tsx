import React from "react";
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
      });
    } else {
      dispatch(fetchSingleCategory({ category })).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          const state = store.getState();
          dispatch(
            currentPage({ currentPage: 1, products: state.product.products })
          );
        }
      });
    }
  }

  return (
    <>
      <div className="w-full flex flex-col p-1">
        <div className="lg:pl-[calc((100vw-90rem)/2)] ml-2 xl:ml-0">
          <h1 className="font-bold text-xl">
            {productFetch.currentCategory} products
          </h1>
          <form action="">
            <select
              className="border-2 border-black rounded"
              name="sort"
              id="sort"
              value={sortProduct}
              onChange={(e) => selectSort(e)}
            >
              <option value="asc">asc</option>
              <option value="desc">desc</option>
            </select>
          </form>
        </div>
        {productFetch.loading ? <p>Loading</p> : ""}
        {productFetch.error ? <p>{productFetch.error}</p> : ""}
        <div className="md:auto-rows-max grid grid-cols-[repeat(auto-fit, minmax(250px, 1fr))] justify-center lg:grid-cols-2 lg:[&>*:nth-child(odd)]:justify-self-end lg:gap-10">
          {!productFetch.loading &&
            currentData.map((item) => {
              return <SingleProduct props={item} key={item.id + "product"} />;
            })}
        </div>
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
