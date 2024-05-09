import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import "./styles/index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import ShopPage from "./components/ShopPage.jsx";
import ShoppingCart from "./components/ShoppingCart.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "homepage", element: <HomePage /> },
      { path: "shoppage", element: <ShopPage /> },
      { path: "shopcart", element: <ShoppingCart /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
