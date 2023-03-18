import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import token from "./utils/token";
import { useSetAtom } from "jotai/react";
import { userAtom } from "./state";
import { test } from "./api";
import { Provider as JotaiProvider } from "jotai";

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
        signup
      </Link>
      <Link className="mx-2 font-light tracking-wide text-stone-800 " to="/login">
        login
      </Link>
      <Link className="mx-2 font-light tracking-wide text-stone-800" to="/">
        home
      </Link>
      <Link className= "mx-2 font-light tracking-wide text-stone-800" to="/">
        favorites
      </Link>

      {/* quick links for better dev exp, make look nice or remove later */}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </Router>
  );
}

export default App;
