import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import FavoritePage from "./pages/FavoritePage";
import Logout from "./pages/Logout";
import token from "./utils/token";
import { useSetAtom } from "jotai/react";
import { userAtom } from "./state";
import { test } from "./api";

function App() {
  const setUser = useSetAtom(userAtom);
  useEffect(() => {
    const tokenData = token.getToken();
    tokenData && setUser(tokenData.data);
    console.log('use effect App')
    test();
    // optional, if no want on main page, you can redirect if no token or expired token
  }, []);
  return (
    <Router>
      {/* quick links for better dev exp, make look nice or remove later */}
      <Link className="mx-2 font-light tracking-wide text-stone-800" to="/signup">
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
      <Link className= "mx-2 font-light tracking-wide text-stone-800" to="/Logout">
        Logout
      </Link>

      {/* quick links for better dev exp, make look nice or remove later */}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/favorite" element={<FavoritePage />} />
        <Route path="/logout" element={<Logout />} />

      </Routes>
    </Router>
  );
}

export default App;
