import React, { useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UserInfo } from '../../redux/slice/appConfigSlice';

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(UserInfo());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="mt-[60px] h-[calc(100vh-60px)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <Outlet />
      </div>
    </>
  );
}

export default Home;
