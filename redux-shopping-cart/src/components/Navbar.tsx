import { useDispatch, useSelector } from "react-redux";
import ShoppingCart from "./ShoppingCart";
import React, { useEffect, useState } from "react";
import {
  fetchCategories,
  setCategory,
} from "../features/categories/categorySlice";
import { fetchSingleCategory } from "../features/products/productSlice";
import { AppDispatch } from "../app/store";
import { currentPage } from "../features/paginator/pageSlice";
import store from "../app/store";

export default function Navbar({
  setSortProduct,
  setShowHomePage,
}: {
  setSortProduct: React.Dispatch<React.SetStateAction<string>>;
  setShowHomePage: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [displayCart, setDisplayCart] = useState(false);
  const categories = useSelector(
    (state: { category: { categories: string[] } }) => state.category.categories
  );
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchCategories());
    setLoading(false);
  }, []);

  return (
    <nav>
      <h1>
        <button onClick={() => setShowHomePage(true)}>Fake Store</button>
      </h1>
      <button onClick={() => setDisplayCart(!displayCart)}>
        Shopping Cart
      </button>
      {displayCart ? <ShoppingCart></ShoppingCart> : ""}
      {loading
        ? "Loading"
        : categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                dispatch(setCategory({ category: category }));
                dispatch(fetchSingleCategory({ category: category })).then(
                  (res) => {
                    if (res.meta.requestStatus === "fulfilled") {
                      const state = store.getState();
                      dispatch(
                        currentPage({
                          currentPage: 1,
                          products: state.product.products,
                        })
                      );
                    }
                  }
                );
                setSortProduct("asc");
                setShowHomePage(false);
              }}
            >
              {category}
            </button>
          ))}
      <button
        onClick={() => {
          dispatch(setCategory({ category: "All" }));
          dispatch(fetchSingleCategory({ category: "All" })).then((res) => {
            if (res.meta.requestStatus === "fulfilled") {
              const state = store.getState();
              dispatch(
                currentPage({
                  currentPage: 1,
                  products: state.product.products,
                })
              );
            }
          });
          setSortProduct("asc");
          setShowHomePage(false);
        }}
      >
        All products
      </button>
    </nav>
  );
}
