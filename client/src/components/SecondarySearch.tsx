import axios from "axios";
import { MouseEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import { nearbySearch, post } from "../api";
import Categories from "./Categories";
import AsyncButton from "./AsyncButton";
import { Loader } from "@googlemaps/js-api-loader";
import GoogleMapReact from "google-map-react";

import {
  matrixInputsAtom,
  coordinateAtom,
  userAtom,
  currentSearchAtom,
  addressAtom,
  mapReloadAtom,
  categoryAtom,
  nextPageAtom,
  currentParamsAtom,
} from "../state";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import CurrentSearch from "./CurrentSearch";

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

export default function SecondarySearchBar() {
  const coordValue = useAtomValue(coordinateAtom);
  const nearbySearchValue = useAtomValue(currentSearchAtom);
  const setNearbySearch = useSetAtom(currentSearchAtom);
  const setReloading = useSetAtom(mapReloadAtom);
  const formattedAddress = useAtomValue(addressAtom);
  // const setLoadValue = useSetAtom(loadingAtom)

  //if search result comes back with more than 20 results, will be called
  const setNextPage = useSetAtom(nextPageAtom);
  const [currentParms, setCurrentParams] = useAtom(currentParamsAtom);
  const [matrixAtom, setMatrixInputs] = useAtom(matrixInputsAtom);
  const [loaded, setLoaded] = useState(false);
  const [loadNextPage, setLoadNextPage] = useState(false);
  const [radius, setRadius] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");

  const nav = useNavigate();

  //for categories
  const [selectedCategory, setSelectedCategory] = useAtom(categoryAtom);
  const [query, setQuery] = useState("");

  const filteredCategory =
    query === ""
      ? category
      : category.filter((oneCategory) => {
          return oneCategory.name.toLowerCase().includes(query.toLowerCase());
        });

  const handleSetUserParams = (event: any) => {
    const { name, value } = event.target;
    return name === "radius"
      ? setRadius(value)
      : name === "type"
      ? setType(value)
      : setKeyword(value);
  };

  const testing = (event: any) => {};

  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    console.log("query", query);

    console.log("selectedCategory", selectedCategory);
    let paramType = "";
    if (selectedCategory.length > 0) {
      paramType = selectedCategory[0].name;
      paramType = paramType.toLocaleLowerCase().replace(/\s/g, "_");
    }

    const userParams = {
      //maps the id's corresponding to the selected categories, will convert to type and concat in end
      type: paramType, //quick fix, will only select the first index of selected category
      radius: radius,
      keyword: keyword,
      coordinate: coordValue,
      //loadNextPage is a state that defaults to false, becomes true when the user clicks the next page button
      useNextPage: loadNextPage,
    };
    console.log("userParams", userParams);
    console.log("keyword", keyword);
    setCurrentParams({
      coords: coordValue,
      address: formattedAddress,
      keyword: keyword,
      radius: userParams.radius,
      type: paramType,
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

  const distanceMatrixCaller = async (matrixInputs: Array<[null]>) => {
    // interface Coordinate {
    //   lat: number;
    //   lng: number;
    // }

    //@ts-ignore
    matrixInputs = matrixAtom;
    console.log("matrixAtom", matrixAtom);
    // let locationDestinations = matrixInputs[0];
    // let origin = matrixInputs[1];
    // function formatMatrixInputs(
    //   locationDestinations: Array<Coordinate>,
    //   origin: Coordinate
    // ) {
    //   let locationOrigin = `${origin.lat}|${origin.lng}`;
    //   let destinationRequest = locationDestinations
    //     .map((location) => {
    //       return `${location.lat},${location.lng}`;
    //     })
    //     .join("|");
    //     console.log("destinationRequest", destinationRequest)
    //   return `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${locationOrigin}&destinations=${destinationRequest}&key=${
    //     import.meta.env.VITE_APIKEY
    //   }`;
    // }
    // console.log("URL", formatMatrixInputs(matrixAtom[0], matrixAtom[1]));
    // async function getStoreDistance(
    //   locationDestinations: Array<Coordinate>,
    //   origin: Coordinate
    // ) {
    //   return await axios
    //     .get(formatMatrixInputs(locationDestinations, origin))
    //     .then((response) => {
    //       console.log("response", response);
    //       return response;
    //     })
    //     .catch((error) => {
    //       console.log("response", error);
    //       return error;
    //     });
    // }
    let service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [matrixAtom[1]],
        destinations: [matrixAtom[0]],
      },
      callback
    );
    function callback(response: object, status: object) {
      console.log(response, status, "response, status");
      return response;
    }
  };

  async function getNearby(userParams: object) {
    const nearbyData = await post("/api/address/nearby", { userParams });
    //nearbyData
    //  searchResults: the result of the nearbySearch API call
    //  validParams: true if the given parameters return results in the nearbySearch Call
    //  moreResults: will either return as False, or as a next page token, which can be used to get the next 20 results
    console.log("validParams", nearbyData.validParams);
    console.log("moreResults", nearbyData.moreResults);
    if (nearbyData.moreResults) {
      setNextPage(true);
    }

    interface Coordinate {
      lat: number;
      lng: number;
    }

    console.log("feedMatrix", nearbyData.feedMatrix);
    //valdiParams is true when given parameters return results in the nearbySearch Call
    if (!nearbyData.validParams) {
      //do something when no nearbysearch results are found
      console.log("your nearbySearch api did not return any results");
    } else {
      localStorage.setItem("lastSearch", JSON.stringify(nearbyData));
      //nearbyData.searchResults is the result of the NearbySearch API call
      setNearbySearch(nearbyData.searchResults);
      console.log(nearbyData);
      console.log("setting Loaded");
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
          className="w-small py-1 pl-3 pr-2 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
          value={radius}
          name="radius"
          onChange={handleSetUserParams}
          type="text"
          placeholder="radius (km)"
        />
        {/* <input
          className="w-small py-1 pl-3 pr-2 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
          value={type}
          name="type"
          onChange={handleSetUserParams}
          type="text"
          placeholder="type"
        
        /> */}
        <Categories
          setQuery={setQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          filteredCategory={filteredCategory}
        />
        <input
          className="w-small py-1 pl-3 pr-2 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
          value={keyword}
          name="keyword"
          onChange={handleSetUserParams}
          type="text"
          placeholder="keyword"
        />
        <button
          className="bg-white text-gray-600 px-2 py-1 rounded-lg mt-2 hover:bg-stone-200 ml-2"
          onClick={handleFormSubmit}
        >
          submit
        </button>

        {loaded ? (
          <AsyncButton
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={distanceMatrixCaller}
          >
            Call Distance Matrix
          </AsyncButton>
        ) : (
          <div></div>
        )}
        <div className="float-right"></div>
      </form>
      {loaded ? <CurrentSearch></CurrentSearch> : <div></div>}
    </>
  );
}
