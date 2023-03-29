// @ts-nocheck
import Mapper from "../components/results/Mapper";
import Catchphrase from "../components/Catchphrase";
import SearchBar from "../components/searchbars/SearchBar";
import FavoriteList from "../components/results/FavoriteList";
import Example from "../components/Example";
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
      <div className="bg-dark my-4">
        <div className="font-fuzzy-bubbles container mx-auto grid grid-cols-12 h-16">
          <div className="flex items-center w-1/6">
            <div className="w-50 h-12 flex-shrink-0">
              <Catchphrase />
            </div>
          </div>
          <h1 className="col-span-2 col-start-6 text-6xl pb-2 tracking-widest">
            Anaxi
          </h1>
          {/* temporary login while redirects are sorted */}

          {/* to avoid redirect, convert a tags to buttons, use onclick to trigger event */}
          {/* <div> */}
            <button
              className="col-start-10 mx-1 transition-all ease-out duration-300 pt-1 hover:scale-110 hover:bg-black hover:bg-opacity-10 border-1 rounded-t-lg text-2xl tracking-wide text-stone-800"
              onClick={() => {
                navigate("/");
              }}
            >
              home
            </button>
            <button
              className="pt-1 mx-1 transition-all ease-out duration-300 hover:scale-110 hover:bg-black hover:bg-opacity-10 border-1 rounded-t-lg text-2xl tracking-wide text-stone-800"
              onClick={() => {
                navigate("/favorites");
              }}
            >
              favorites
            </button>

            {!user ? (
              <button
                className="pt-1 mx-1 transition-all ease-out duration-300  hover:scale-110 hover:bg-black hover:bg-opacity-10 border-1 rounded-t-lg text-2xl tracking-wide text-stone-800"
                onClick={() => {
                  navigate("/login");
                }}
              >
                login
              </button>
            ) : (
              <button
                className="pt-1 mx-1 transition-all ease-out duration-300 hover:scale-110 hover:bg-black hover:bg-opacity-10 border-1 rounded-t-lg text-xl tracking-wide text-stone-800"
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
          {/* </div> */}
          {/* <Example /> */}
        </div>
      </div>
      {!isReloading && <Mapper />}

      <SearchBar />

      {/* <FavoriteList /> */}
    </div>
  );
}
