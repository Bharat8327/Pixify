import React, { useEffect } from "react";
import axiosClient from "../../utils/axiosClients";
import Navbar from "../../components/navbar/Navbar";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <>
      <Navbar />
      <div className="mt-[60px]">
      <Outlet />
      </div>
    </>
  );
}

export default Home;
