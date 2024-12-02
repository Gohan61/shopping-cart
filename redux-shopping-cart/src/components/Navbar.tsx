import { useDispatch, useSelector } from "react-redux";
import ShoppingCart from "./ShoppingCart";
import { useEffect, useState } from "react";
import {
  fetchCategories,
  setCategory,
} from "../features/categories/categorySlice";
import { AppDispatch } from "../app/store";

export default function Navbar() {
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
      <button onClick={() => setDisplayCart(!displayCart)}>
        Shopping Cart
      </button>
      {displayCart ? <ShoppingCart></ShoppingCart> : ""}
      {loading
        ? "Loading"
        : categories.map((category) => (
            <button
              onClick={() => dispatch(setCategory({ category: category }))}
            >
              {category}
            </button>
          ))}
      <button onClick={() => dispatch(setCategory({ category: "All" }))}>
        All products
      </button>
    </nav>
  );
}
