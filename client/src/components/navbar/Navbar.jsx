import React from 'react';
import '../../../src/index.css';
import Avatar from '../avatar/Avatar';
import { BiLogOutCircle } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../../utils/axiosClients';
import { KEY_ACCESS_TOKEN, removeItem } from '../../utils/localStorageManager';
import { setTheme } from '../../redux/slice/appConfigSlice';
import { MdDarkMode } from 'react-icons/md';
import { useLocation } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const profile = useSelector((state) => state.appconfig.myProfile);
  const theme = useSelector((state) => state.appconfig.theme);
  const dispatch = useDispatch();
  const handleTheme = () => {
    dispatch(setTheme(!theme));
  };

  const handleLogOut = async () => {
    try {
      await axiosClient.post('/auth/logout');
      removeItem(KEY_ACCESS_TOKEN);
      navigate('/login');
    } catch (e) {
      console.log(e);
    }
  };

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      className={`border-b-2 var(--border-color) h-[50px] fixed top-0 w-full ${
        theme ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      <div className="flex max-w-[960px] h-[100%] justify-between items-center mx-auto">
        <h1
          className="text-2xl font-semibold cursor-pointer"
          onClick={() => navigate('/')}
        >
          <span className="text-cyan-500 hover:text-red-400 active:hover:text-black">
            <span className="text-pink-400">p</span>
            <sup>atel</sup>
            <sub className="text-blue-400">
              Brother'<sup className="text-yellow-400">s</sup>
            </sub>
          </span>
        </h1>
        <div className="hidden md:flex gap-5 items-center">
          <div
            className="font-semibold cursor-pointer"
            onClick={() => navigate(`/profile/${profile?._id}`)}
          >
            <Avatar src={profile?.avatar?.url} />
          </div>
          <div className="text-4xl cursor-pointer hover:text-red-500 active:text-black">
            <BiLogOutCircle onClick={handleLogOut} />
          </div>
          <div onClick={handleTheme}>
            <MdDarkMode className="text-4xl" />
          </div>
        </div>
        <div className="md:hidden flex items-center">
          <button className="text-3xl focus:outline-none" onClick={toggleMenu}>
            ☰
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div
          className={`absolute top-[50px] right-0 w-full  ${
            theme ? 'bg-black text-white' : 'bg-white text-black'
          } md:hidden`}
        >
          <ul className="flex flex-col items-center gap-4 py-4">
            <li
              className="cursor-pointer"
              onClick={() => {
                navigate(`/profile/${profile?._id}`);
                setIsMenuOpen(false);
              }}
            >
              Profile
            </li>
            <li
              className="cursor-pointer"
              onClick={() => {
                handleTheme();
                setIsMenuOpen(false);
              }}
            >
              {theme ? 'white' : 'black'}
            </li>
           {location.pathname!=='/user' &&<li
              className="cursor-pointer text-red-500"
              onClick={() => {
                setIsMenuOpen(false);
              }}
            >
              <Link to="/user"> un/Follow</Link>
            </li>}

            <li
              className="cursor-pointer text-red-500"
              onClick={() => {
                handleLogOut();
                setIsMenuOpen(false);
              }}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;
