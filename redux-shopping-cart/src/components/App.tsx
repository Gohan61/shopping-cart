import { useState } from "react";
import AllProducts from "../features/products/AllProducts";
import Navbar from "./Navbar";

function App() {
  const [sortProduct, setSortProduct] = useState("asc");
  return (
    <>
      <Navbar setSortProduct={setSortProduct}></Navbar>
      <AllProducts
        sortProduct={sortProduct}
        setSortProduct={setSortProduct}
      ></AllProducts>
    </>
  );
}

export default App;
