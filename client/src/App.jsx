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

function App() {
  const isLoading = useSelector((state) => state.appconfigReducer.isLoading);
  const loadingRef = useRef(null);

  useEffect(() => {
    if (isLoading) {
      loadingRef.current?.continuousStart();
    } else {
      loadingRef.current?.complete();
    }
  }, [isLoading]);

  return (
    <div>
      <LoadingBar height={3} color="red" ref={loadingRef} />
      <Routes>
        <Route path="*" element={<PageNotFound />} /> // when no route matched
        <Route element={<RequireUser />}>
          <Route element={<Home />}>
            <Route path="/" element={<Feed />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/update" element={<UpdateProfile />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
