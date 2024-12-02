import { useState } from "react";
import AllProducts from "../features/products/AllProducts";
import Navbar from "./Navbar";
import HomePage from "./Homepage";

function App() {
  const [sortProduct, setSortProduct] = useState("asc");
  const [showHomePage, setShowHomePage] = useState(true);

  return (
    <>
      <Navbar
        setSortProduct={setSortProduct}
        setShowHomePage={setShowHomePage}
      ></Navbar>
      {showHomePage ? (
        <HomePage></HomePage>
      ) : (
        <AllProducts
          sortProduct={sortProduct}
          setSortProduct={setSortProduct}
        ></AllProducts>
      )}
    </>
  );
}

export default App;
