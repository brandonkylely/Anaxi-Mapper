import Mapper from "../components/Mapper";
import Catchphrase from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import Dropdown from "../components/Dropdown";
import Favorite from "../components/FavoriteList/Favorite";
import Categories from "../components/Categories";
import SecondarySearchBar from "../components/SecondarySearch";

// import Slidebar from "../components/slidebar";
import { useAtomValue } from "jotai";
import { mapReloadAtom } from "../state";
export default function MainPage() {
  const isReloading = useAtomValue(mapReloadAtom);
  return (
    <div>
      <div className="font-fuzzy-bubbles grid grid-cols-12 pt-2 text-center font-bold">
      <Catchphrase />
        <h1 className="col-span-2 col-start-6 text-6xl pb-2 tracking-widest">
          Anaxi
        </h1>
        {/* to avoid redirect, convert a tags to buttons, use onclick to trigger event */}
        <a className="col-start-10 transition-all ease-out duration-300 pt-4 hover:scale-110 hover:bg-black hover:bg-opacity-10 border-1 rounded-t-lg text-3xl tracking-wide text-stone-800" href="/home">
          home
        </a>
        <a className="pt-4 transition-all ease-out duration-300 pt-3 hover:scale-110 hover:bg-black hover:bg-opacity-10 border-1 rounded-t-lg text-3xl tracking-wide text-stone-800" href="/favorites">
          favorites
        </a>
        <a className="pt-4 transition-all ease-out duration-300 pt-3 hover:scale-110 hover:bg-black hover:bg-opacity-10 border-1 rounded-t-lg text-3xl tracking-wide text-stone-800" href="/logout">
          logout
        </a>
        {/* <Dropdown /> */}
      </div>



      {!isReloading && <Mapper />}




      <SearchBar />

      {/* <Categories /> */}

      {/* <Slidebar /> */}
      {/* <FavoritePage /> */}
      

    </div>
  );
}
