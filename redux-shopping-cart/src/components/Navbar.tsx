import { useDispatch, useSelector } from "react-redux";
import ShoppingCart from "./ShoppingCart";
import React, { useEffect, useRef, useState } from "react";
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
  const displayCartRef = useRef<HTMLDivElement>(null);
  const categories = useSelector(
    (state: { category: { categories: string[] } }) => state.category.categories
  );
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchCategories());
    setLoading(false);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        displayCartRef.current &&
        !displayCartRef.current.contains(event.target as Node)
      ) {
        setDisplayCart(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <nav className="w-full flex justify-around items-center border-b-2 shadow-sm relative h-fit lg:px-[calc((100vw-80rem)/2)]">
      <h1>
        <button
          onClick={() => setShowHomePage(true)}
          className="border-2 p-1 rounded bg-cyan-700 text-white font-bold text-xs md:text-base"
        >
          Fake Store
        </button>
      </h1>
      <div className="flex justify-between gap-6 p-1 overflow-auto whitespace-nowrap ">
        {loading
          ? "Loading"
          : categories.map((category) => (
              <button
                className="bg-cyan-800 rounded p-1 text-white font-bold text-xs md:text-base hover:bg-gray-700"
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
          className="bg-cyan-800 rounded p-1 text-white font-bold text-xs md:text-base hover:bg-gray-700"
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
      </div>
      <button
        className="bg-red-800 text-white rounded p-1 font-bold text-xs md:text-base hover:bg-red-950"
        onClick={() => setDisplayCart(!displayCart)}
      >
        Shopping Cart
      </button>
      {displayCart ? (
        <ShoppingCart displayCartRef={displayCartRef}></ShoppingCart>
      ) : (
        ""
      )}
    </nav>
  );
}
