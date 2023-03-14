import Mapper from "../components/Mapper";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import Dropdown from "../components/Dropdown";
import Favorite from "../components/FavoriteList/Favorite";


export default function MainPage() {
  return (
    <div>
      <Mapper />

      <Dropdown />

      <NavBar />

      <SearchBar />

      <Favorite />

    </div>
  );
}
