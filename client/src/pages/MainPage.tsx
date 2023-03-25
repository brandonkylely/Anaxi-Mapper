import Mapper from "../components/Mapper";
import NavBar from "../components/NavBar";
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
      <div className="grid grid-cols-12 pt-2">
        <h1 className="cursive col-span-2 col-start-6 text-center font-bold text-6xl tracking-widest font-serif py-3 pt-0">
          Anaxi
        </h1>
        <Dropdown />
      </div>


      {!isReloading && <Mapper />}


      <NavBar />

      <SearchBar />

      {/* <Categories /> */}

      {/* <Slidebar /> */}
      {/* <FavoritePage /> */}
      

    </div>
  );
}
