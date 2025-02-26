import React, { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserInfo } from "../../redux/slice/appConfigSlice";

function Home() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(UserInfo());
  },[])

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
