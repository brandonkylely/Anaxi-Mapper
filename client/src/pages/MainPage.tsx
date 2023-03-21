import Mapper from "../components/Mapper";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import Dropdown from "../components/Dropdown";
import Favorite from "../components/FavoriteList/Favorite";
import Categories from "../components/Categories";
import Title from "../components/Title";
import FavoriteList from "../components/FavoriteList/FavoriteList";
import SecondarySearchBar from "../components/SecondarySearch";

// import Slidebar from "../components/slidebar";
import { useAtomValue } from "jotai";
import { mapReloadAtom } from "../state";
export default function MainPage() {
  const isReloading = useAtomValue(mapReloadAtom);
  return (
    <div>
      <Title />

      {!isReloading && <Mapper />}

      {/* <Dropdown /> */}

      <NavBar />

      <SearchBar />

      {/* <Categories /> */}

      {/* <Slidebar /> */}

      <Favorite />
    </div>
  );
}
