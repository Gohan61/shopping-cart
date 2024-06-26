import { useState } from "react";
import NavBar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function App() {
  const [cartItem, addToCart] = useState({});
  return (
    <>
      <NavBar cartItem={cartItem}></NavBar>
      <Outlet context={[cartItem, addToCart]}></Outlet>
    </>
  );
}
