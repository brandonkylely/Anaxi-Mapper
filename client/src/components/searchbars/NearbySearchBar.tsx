import { MouseEventHandler, ChangeEventHandler, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { nearbySearchData, post } from "../../api";
import Categories from "../archived-components/Categories";

import {
  coordinateAtom,
  userAtom,
  nearbyPlacesAtom,
  addressAtom,
  mapReloadAtom,
  categoryAtom,
  nextPageAtom,
  currentParamsAtom,
} from "../../state";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import NearbySearchResults from "../results/NearbySearchResults";
import FavoriteList from "../results/FavoriteList";

const category = [
  { id: 1, name: "Accounting" },
  { id: 2, name: "Airport" },
  { id: 3, name: "Amusement park" },
  { id: 4, name: "Aquarium" },
  { id: 5, name: "Art gallery" },
  { id: 6, name: "ATM" },
  { id: 7, name: "Bakery" },
  { id: 8, name: "Bank" },
  { id: 9, name: "Bar" },
  { id: 10, name: "Beauty salon" },
  { id: 11, name: "Bicycle store" },
  { id: 12, name: "Book store" },
  { id: 13, name: "Bowling alley" },
  { id: 14, name: "Bus station" },
  { id: 15, name: "Cafe" },
  { id: 16, name: "Campground" },
  { id: 17, name: "Car dealer" },
  { id: 18, name: "Car rental" },
  { id: 19, name: "Car repair" },
  { id: 20, name: "Car wash" },
  { id: 21, name: "Casino" },
  { id: 22, name: "Cemetery" },
  { id: 23, name: "Church" },
  { id: 24, name: "City hall" },
  { id: 25, name: "Clothing store" },
  { id: 26, name: "Convenience store" },
  { id: 27, name: "Courthouse" },
  { id: 28, name: "Dentist" },
  { id: 29, name: "Department store" },
  { id: 30, name: "Doctor" },
  { id: 31, name: "Drugstore" },
  { id: 32, name: "Electrician" },
  { id: 33, name: "Electronics store" },
  { id: 34, name: "Embassy" },
  { id: 35, name: "Fire Station" },
  { id: 36, name: "Florist" },
  { id: 37, name: "Funeral home" },
  { id: 38, name: "Furniture store" },
  { id: 39, name: "Gas station" },
  { id: 40, name: "Gym" },
  { id: 41, name: "Hair care" },
  { id: 42, name: "Hardware store" },
  { id: 43, name: "Hindu Temple" },
  { id: 44, name: "Home goods store" },
  { id: 45, name: "Hospital" },
  { id: 46, name: "Insurance company" },
  { id: 47, name: "Jewelry store" },
  { id: 48, name: "Laundry" },
  { id: 49, name: "Lawyer" },
  { id: 50, name: "Library" },
  { id: 51, name: "Light rail statiom" },
  { id: 52, name: "Liquor store" },
  { id: 53, name: "Local government office" },
  { id: 54, name: "Locksmith" },
  { id: 55, name: "Lodging" },
  { id: 56, name: "Meal Delivery" },
  { id: 57, name: "Meal takeaway" },
  { id: 58, name: "Mosque" },
  { id: 59, name: "Movie rental" },
  { id: 60, name: "Movie theater" },
  { id: 61, name: "Moving company" },
  { id: 62, name: "Museum" },
  { id: 63, name: "Night club" },
  { id: 64, name: "Painter" },
  { id: 65, name: "Park" },
  { id: 66, name: "Parking" },
  { id: 67, name: "Pet store" },
  { id: 68, name: "Pharmacy" },
  { id: 69, name: "Physiotherapist" },
  { id: 70, name: "Plumber" },
  { id: 71, name: "Police" },
  { id: 72, name: "Post office" },
  { id: 73, name: "Primary school" },
  { id: 74, name: "Real estate agency" },
  { id: 75, name: "Restaurant" },
  { id: 76, name: "Roofing contractor" },
  { id: 77, name: "RV park" },
  { id: 78, name: "School" },
  { id: 79, name: "Secondary school" },
  { id: 80, name: "Shoe store" },
  { id: 81, name: "Shopping mall" },
  { id: 82, name: "Spa" },
  { id: 83, name: "Stadium" },
  { id: 84, name: "Storage" },
  { id: 85, name: "Store" },
  { id: 86, name: "Subway station" },
  { id: 87, name: "Supermarket" },
  { id: 88, name: "Synagogue" },
  { id: 89, name: "Taxi stand" },
  { id: 90, name: "Train station" },
  { id: 91, name: "Transit station" },
  { id: 92, name: "Travel agency" },
  { id: 93, name: "University" },
  { id: 94, name: "Veterinary care" },
  { id: 95, name: "Zoo" },
];

export default function NearbySearchBar() {
  const coordValue = useAtomValue(coordinateAtom);
  const nearbySearchValue = useAtomValue(nearbyPlacesAtom);
  const setNearbySearch = useSetAtom(nearbyPlacesAtom);
  const setReloading = useSetAtom(mapReloadAtom);
  const formattedAddress = useAtomValue(addressAtom);
  // const setLoadValue = useSetAtom(loadingAtom)

  //if search result comes back with more than 20 results, will be called
  const setNextPage = useSetAtom(nextPageAtom);
  const [currentParms, setCurrentParams] = useAtom(currentParamsAtom);
  const [loaded, setLoaded] = useState(false);
  const [loadNextPage, setLoadNextPage] = useState(false);
  const [radius, setRadius] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");

  const nav = useNavigate();

  //for categories
  // const [selectedCategory, setSelectedCategory] = useAtom(categoryAtom);
  // const [query, setQuery] = useState("");

  // const filteredCategory =
  //   query === ""
  //     ? category
  //     : category.filter((oneCategory) => {
  //         return oneCategory.name.toLowerCase().includes(query.toLowerCase());
  //       });

  const handleTypeSelect = (event: ChangeEventHandler) => {
    const selection = event.target.value.toLowerCase()
    setType(selection.replaceAll(' ', '_'))
    // console.log(event.target.value)
  }

  // useEffect(() =>{
  //   console.log("type" + type)
  // }, [type])


  const handleSetUserParams = (event: ChangeEventHandler) => {
    const { name, value } = event.target;
    return name === "radius"
      ? setRadius(value)
      // : name === "type"
      // ? setType(value)
      : setKeyword(value);
  };

  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    // console.log("query", query);

    // console.log("selectedCategory",selectedCategory)
    // let paramType = "";
    // if (selectedCategory.length > 0) {
    //   paramType = selectedCategory[0].name;
    //   paramType = paramType.toLocaleLowerCase().replace(/\s/g, "_");
    // }

    const userParams = {
      //maps the id's corresponding to the selected categories, will convert to type and concat in end
      type: type, //quick fix, will only select the first index of selected category
      radius: radius,
      keyword: keyword,
      coordinate: coordValue,
      //loadNextPage is a state that defaults to false, becomes true when the user clicks the next page button
      useNextPage: loadNextPage,
    };
    console.log("userParams",userParams)
    // console.log("keyword",keyword)
    setCurrentParams({
      coords: coordValue,
      address: formattedAddress,
      keyword: keyword,
      radius: radius,
      type: type,
    });

    getNearby(userParams).then((result) => {
      localStorage.setItem("lastCoords", JSON.stringify(coordValue));

      // setReloading(true);
      // setTimeout(() => setReloading(false), 300);

      // console.log('getNearby Result', result)
      // setSearch(result);
      // console.log(result);
      // return result.json();
      // alert(`${apiFetch(result)}`);
    });
  };

  async function getNearby(userParams: object) {
    console.log(userParams)
    const nearbyData = await post("/api/address/nearby", { userParams });
    //nearbyData
    //  searchResults: the result of the nearbySearchData API call
    //  validParams: true if the given parameters return results in the nearbySearchData Call
    //  moreResults: will either return as False, or as a next page token, which can be used to get the next 20 results
    // console.log("validParams", nearbyData.validParams);
    // console.log("moreResults", nearbyData.moreResults);
    if (nearbyData.moreResults) {
      setNextPage(true);
    }
    //valdiParams is true when given parameters return results in the nearbySearch Call
    if (!nearbyData.validParams) {
      //do something when no nearbysearch results are found
      console.log("your nearbySearchData api did not return any results");
    } else {
      localStorage.setItem("lastSearch", JSON.stringify(nearbyData));
      //nearbyData.searchResults is the result of the NearbySearchData API call
      setNearbySearch(nearbyData.searchResults);
      // console.log(nearbyData);
      // console.log("setting Loaded");
      setLoaded(true);
    }

    //TODO: if moreResults is true, generate a button that can make another API call to get the next 20 results
    // This could be a button that calls getNearby while passing in the next page token
    // if (nearbyData.moreResults) {
    // console.log("currentSearch Log");
  }

  return (
    <>
      {/* <h2>{currentSearch[0].place_id}</h2> */}
      <form className="px-4 form">
        <input
          className="font-fuzzy-bubbles w-1/6 h-12 text-2xl py-1 pl-3 pr-2 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
          value={radius}
          name="radius"
          onChange={handleSetUserParams}
          type="text"
          placeholder="radius (km)"
        />

        {/* <input
          className="font-fuzzy-bubbles w-1/6 h-12 text-2xl py-1 pl-3 pr-2 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
          value={type}
          name="type"
          onChange={handleSetUserParams}
          type="text"
          placeholder="type"
        /> */}
        {/* <Categories
          setQuery={setQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          filteredCategory={filteredCategory}
        /> */}

        {/* needs work */}
        <select name="type" 
        onChange={handleTypeSelect}
        className="font-fuzzy-bubbles w-1/6 h-12 text-2xl py-1 pl-3 pr-2 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600">
          {category.map((option, index) => (
            <option value={option.name} key={index}>{option.name}</option>
          ))}
        </select>
        <input
          className="font-fuzzy-bubbles w-1/6 h-12 text-2xl py-1 pl-3 pr-2 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
          value={keyword}
          name="keyword"
          onChange={handleSetUserParams}
          type="text"
          placeholder="keyword"
        />
        <button
          className="font-fuzzy-bubbles w-1/12 h-12 text-2xl bg-white text-gray-600 py-auto rounded-lg mt-2 transition-all ease-out duration-300 hover:scale-110 hover:bg-black hover:bg-opacity-10 ml-2"
          onClick={handleFormSubmit}
        >
          submit
        </button>
      </form>
      <FavoriteList />
      {loaded ? <NearbySearchResults/> : <div></div>}
    </>
  );
}
