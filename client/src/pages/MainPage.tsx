
import Mapper from "../components/Mapper";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import Dropdown from "../components/Dropdown";
import Favorite from "../components/FavoriteList/Favorite";
import Categories from "../components/Categories";

// import Slidebar from "../components/slidebar";


export default function MainPage() {

  return (
    <div>
      <Mapper />

      <Dropdown />

      <NavBar />

      <SearchBar />
      
      <Categories />

      {/* <Slidebar /> */}
      
      <Favorite />

    </div>
  );
}
