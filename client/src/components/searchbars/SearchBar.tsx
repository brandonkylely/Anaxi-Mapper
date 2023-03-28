// https://developers.google.com/maps/documentation/javascript/places#place_searches
// @ts-nocheck
import { MouseEventHandler, useState, useContext } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { coordinateAtom, userAtom, addressAtom, categoryAtom, originIDAtom } from "../../state";
import Categories from "../archived-components/Categories";
// import coordState from "../state";
import { nearbySearchData, post } from "../../api";
import NearbySearchBar from "./NearbySearchBar";

type City = {
  address: string;
  coords: {
    lat: number;
    lng: number;
  };
  place_id: string;
};

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
  { id: 90, name: "Tourist Attraction"},
  { id: 91, name: "Train station" },
  { id: 92, name: "Transit station" },
  { id: 93, name: "Travel agency" },
  { id: 94, name: "University" },
  { id: 95, name: "Veterinary care" },
  { id: 96, name: "Zoo" },
];

// address: cityData.results[0].formatted_address,
// coords: {
//   lat: cityData.results[0].geometry.location.lat,
//   lon: cityData.results[0].geometry.location.lon,
// },
// place_id: cityData.results[0].place_id,

type GeoLocation = {
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  place_id: string;
};

type GeoLocationResult = {
  results: GeoLocation[];
};

// https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=${type}&keyword=${keyword}&key=import.meta.env.VITE_APIKEY

export default function SearchBar() {
  const user = useAtomValue(userAtom);
  // const { currentCoords, setCurrentCoords } = useContext(coordState);
  const coordValue = useAtomValue(coordinateAtom);
  const [originID, setOriginID] = useAtom(originIDAtom);
  const setCoord = useSetAtom(coordinateAtom);
  const setAddress = useSetAtom(addressAtom);

  const [loaded, setLoaded] = useState(false);

  //for categories
  const [selectedCategory, setSelectedCategory] = useAtom(categoryAtom);
  const [query, setQuery] = useState("");

  const filteredCategory =
    query === ""
      ? category
      : category.filter((oneCategory) => {
          return oneCategory.name.toLowerCase().includes(query.toLowerCase());
        });

  // console.log(selectedCategory);
  // console.log(query);

  // if (!localCoordState) {
  //   console.warn('because the local coord state is undefined, the search bar is not being returned );')
  //   return <></>;
  // }
  // const { currentCoords, setCurrentCoords } = localCoordState;

  const cityList: City[] = [];

  const [userAddress, setUserAddress] = useState<string>("");

  const handleSetUserAddress = (event: any) => {
    
    //I want to create an object with keys 1 through 103 with the value as the place type
    
    
    const newAddress = event.target.value;
    console.log("address " + newAddress);
    setUserAddress(newAddress);
  };

  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    // console.log(query);
    // console.log(selectedCategory);
    getCoords(userAddress).then((result) => {
      // console.log('invalid search')
      //TODO: Add error handing after form submit
    });
  };

  async function getCoords(userAddress: string) {
    const addressData = await post("/api/address/search", { userAddress });

    console.log("RES", addressData);
    //if addressData.validAddress - if the geocode api search does not return a result, this will be false
    if (addressData.validAddress) {
      setLoaded(true);
      setCoord(addressData.newAddress.coords);
      setAddress(addressData.newAddress.address);
      setOriginID(addressData.newAddress.place_id);
      console.log(addressData.newAddress.place_id, "ORIGINID")
    }
    if (!addressData.validAddress) console.log("that is not a valid address");
    // setCoord(addressData.newAddress.coords);
    console.log("coordValue", coordValue);

    //TODO HERE ---
    console.log("address", addressData);
  }

  return (
    <>
      <form className="px-4 form">
        {/* JUST POC , THIS IS HOW TO CONSUME */}

        {/* <h1> {user?.email}</h1> */}

        <input
          className="font-fuzzy-bubbles w-1/3 h-12 text-2xl py-1 pl-3 pr-2 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
          value={userAddress}
          name="userAddress"
          onChange={handleSetUserAddress}
          type="text"
          placeholder="Enter an address"
        />
        <button
          className="font-fuzzy-bubbles w-1/12 h-12 text-2xl bg-white text-gray-600 py-auto rounded-lg mt-2 transition-all ease-out duration-300 hover:scale-110 hover:bg-black hover:bg-opacity-10 ml-2"
          onClick={handleFormSubmit}
        >
          submit
        </button>
        {/* <div className="w-small py-1 pl-3 pr-2 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600 float-right">
          <Categories
            setQuery={setQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            filteredCategory={filteredCategory}
          />
        </div> */}
      </form>
      {loaded ? <NearbySearchBar></NearbySearchBar> : <div></div>}
    </>
  );
}
