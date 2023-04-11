import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import FavoriteList from "./components/results/FavoriteList";
import Logout from "./pages/Logout";
import token from "./utils/token";
import { useSetAtom } from "jotai/react";
import { userAtom } from "./state";
import { test } from "./api";
import SearchList from "./pages/FavoritesPage";
import HomePage from "./pages/HomePage";
import MidwayPage from "./pages/MidwayPage";

function App() {
  const setUser = useSetAtom(userAtom);
  // console.count("APP UPDATE");
  useEffect(() => {
    const tokenData = token.getToken();
    tokenData && setUser(tokenData.data);
    // console.log("use effect App");
    // test();
    // optional, if no want on main page, you can redirect if no token or expired token
  }, []);
  return (
    <Router>
      {/* deprecated links */}
      {/* <Link className="mx-2 font-light tracking-wide text-stone-800" to="/signup">
          Signup
          </Link>
          <Link className="mx-2 font-light tracking-wide text-stone-800 " to="/login">
          Login
          </Link>
          <Link className="mx-2 font-light tracking-wide text-stone-800" to="/">
          Home
          </Link>
          <Link className= "mx-2 font-light tracking-wide text-stone-800" to="/favorite">
          Favorites
          </Link>
          <Link className= "mx-2 font-md tracking-wide text-stone-800 float-right" to="/Logout">
          LOGOUT
        </Link> */}
      <Routes>
        <Route path="/search" element={<MainPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/favorites" element={<SearchList />} />
        <Route path="/midway" element={<MidwayPage />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;
