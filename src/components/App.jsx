import { useState } from "react";
import NavBar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <>
      <NavBar></NavBar>
      <Outlet></Outlet>
    </>
  );
}
