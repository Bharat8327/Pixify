import Feed from './components/feed/Feed';
import Profile from './components/profile/Profile';
import RequireUser from './components/RequireUser';
import UpdateProfile from './components/updateProfile/UpdateProfile';
import Home from './pages/homepage/Home';
import Login from './pages/login/login';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Signup from './pages/signup/signup';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
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
