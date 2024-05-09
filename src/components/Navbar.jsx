import { useState } from "react";
import { Link } from "react-router-dom";
import ShoppingCart from "./ShoppingCart";

export default function NavBar() {
  const [currentPage, setCurrentPage] = useState("homepage");
  return (
    <>
      <nav>
        <h3>Navigation</h3>
        <ul>
          {currentPage === "shoppage" ? (
            <>
              <Link to={"homepage"} onClick={() => setCurrentPage("homepage")}>
                Home page
              </Link>
              <ShoppingCart />
            </>
          ) : (
            <Link to={"shoppage"} onClick={() => setCurrentPage("shoppage")}>
              Shop page
            </Link>
          )}
        </ul>
      </nav>
    </>
  );
}
