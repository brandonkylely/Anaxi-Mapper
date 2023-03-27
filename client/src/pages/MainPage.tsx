// @ts-nocheck
import Mapper from "../components/results/Mapper";
import Catchphrase from "../components/Catchphrase";
import SearchBar from "../components/searchbars/SearchBar";
import FavoriteList from "../components/results/FavoriteList";
import { useNavigate } from "react-router-dom";
import { useAtomValue, useAtom } from "jotai";
import { mapReloadAtom, userAtom } from "../state";
import tokenUtil from "../utils/token";

export default function MainPage() {
  const isReloading = useAtomValue(mapReloadAtom);
  const navigate = useNavigate();
  const [user, setUser] = useAtom(userAtom);
  return (
    <div>
      <div className="font-fuzzy-bubbles grid grid-cols-12 pt-2 text-center font-bold">
        <Catchphrase />
        <h1 className="col-span-2 col-start-6 text-6xl pb-2 tracking-widest">
          Anaxi
        </h1>
        {/* temporary login while redirects are sorted */}
        <>
          {!user ? (
            <button
              className="col-start-9 pt-4 transition-all ease-out duration-300 pt-3 hover:scale-110 hover:bg-black hover:bg-opacity-10 border-1 rounded-t-lg text-3xl tracking-wide text-stone-800"
              onClick={() => {
                navigate("/login");
              }}
            >
              login
            </button>
          ) : (
            <button
              className="pt-4 transition-all ease-out duration-300 pt-3 hover:scale-110 hover:bg-black hover:bg-opacity-10 border-1 rounded-t-lg text-3xl tracking-wide text-stone-800"
              onClick={() => {
                tokenUtil.logout();
                setUser(null);
                console.log("on click logout!");
                localStorage.clear();
                navigate("/login");
              }}
            >
              logout
            </button>
          )}
        </>
        {/* to avoid redirect, convert a tags to buttons, use onclick to trigger event */}
        <button
          className="col-start-10 transition-all ease-out duration-300 pt-4 hover:scale-110 hover:bg-black hover:bg-opacity-10 border-1 rounded-t-lg text-3xl tracking-wide text-stone-800"
          onClick={() => {
            navigate("/home");
          }}
        >
          home
        </button>
        <button
          className="pt-4 transition-all ease-out duration-300 pt-3 hover:scale-110 hover:bg-black hover:bg-opacity-10 border-1 rounded-t-lg text-3xl tracking-wide text-stone-800"
          onClick={() => {
            navigate("/favorites");
          }}
        >
          favorites
        </button>
      </div>

      {!isReloading && <Mapper />}

      <SearchBar />

      <FavoriteList />
    </div>
  );
}
