import { useSelector } from 'react-redux';
import Feed from './components/feed/Feed';
import Profile from './components/profile/Profile';
import RequireUser from './components/RequireUser';
import UpdateProfile from './components/updateProfile/UpdateProfile';
import Home from './pages/homepage/Home';
import Login from './pages/login/login';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Signup from './pages/signup/signup';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import LoadingBar from 'react-top-loading-bar';
import NotLoggedIn from './components/NotLoggedIn';
import toast, { Toaster } from 'react-hot-toast';

export const TOAST_SUCCESS = 'toast_success';
export const TOAST_FAILURE = 'toast_failure';

function App() {
  const isLoading = useSelector((state) => state.appconfigReducer.isLoading);
  const tostData = useSelector((state) => state.appconfigReducer.toastData);
  const loadingRef = useRef(null);

  useEffect(() => {
    if (isLoading) {
      loadingRef.current?.continuousStart();
    } else {
      loadingRef.current?.complete();
    }
  }, [isLoading]);

  useEffect(() => {
    switch (tostData.type) {
      case TOAST_SUCCESS:
        toast.success(tostData?.message);
        break;
      case TOAST_FAILURE:
        toast.error(tostData?.message);
        break;
      default:
        break;
    }
  }, [tostData]);

  return (
    <div>
      <LoadingBar height={3} color="red" ref={loadingRef} />
      <div>
        <Toaster />
      </div>
      <Routes>
        <Route path="*" element={<PageNotFound />} /> // when no route matched
        <Route element={<RequireUser />}>
          <Route element={<Home />}>
            <Route path="/" element={<Feed />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/update" element={<UpdateProfile />} />
          </Route>
        </Route>
        <Route element={<NotLoggedIn />}>
          // when user not logges in this naviagte to login page then login
          navigate to home page
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
