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
import cartIcon from "../assets/shopping_cart.png";

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
    <nav className="w-full flex justify-around items-center shadow-md shadow-cyan-900 relative h-fit lg:px-[calc((100vw-80rem)/2)] mb-4 md:mb-5 lg-mb-0 bg-blue-900">
      <h1>
        <button
          onClick={() => setShowHomePage(true)}
          className="px-2 rounded-md text-xs text-white font-bold md:text-base mt-1 sm:mt-0"
        >
          Fake Store
        </button>
      </h1>
      <div className="flex items-center p-1 overflow-auto whitespace-nowrap divide-dashed divide-blue-400 divide-x">
        {loading
          ? "Loading"
          : categories.map((category) => (
              <button
                className="px-4 mt-auto font-bold text-xs md:text-sm hover:bg-gray-700 text-white"
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
          className="px-4 text-white font-bold text-xs md:text-xs hover:bg-gray-700"
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
        className="bg-red-800 text-white rounded px-1 py-1 mr-[2px] h-fit font-bold text-xs md:text-base hover:bg-red-950"
        onClick={() => setDisplayCart(!displayCart)}
      >
        <img
          src={cartIcon}
          alt=""
          width="21px"
          className="w-[40px] sm:w-[21px]"
        />
      </button>
      {displayCart ? (
        <ShoppingCart displayCartRef={displayCartRef}></ShoppingCart>
      ) : (
        ""
      )}
    </nav>
  );
}
