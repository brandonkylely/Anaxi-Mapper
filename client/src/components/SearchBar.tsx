// https://developers.google.com/maps/documentation/javascript/places#place_searches

import { MouseEventHandler, useState, useContext } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { coordinateAtom, userAtom, addressAtom } from "../state";
import Categories from "./Categories";
// import coordState from "../state";
import { nearbySearch, post } from "../api";
import SecondarySearchBar from "./SecondarySearch";

type City = {
  address: string;
  coords: {
    lat: number;
    lng: number;
  };
  place_id: string;
};

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
  const setCoord = useSetAtom(coordinateAtom);
  const setAddress = useSetAtom(addressAtom);
  
  const [loaded, setLoaded] = useState(false)

  // if (!localCoordState) {
  //   console.warn('because the local coord state is undefined, the search bar is not being returned );')
  //   return <></>;
  // }
  // const { currentCoords, setCurrentCoords } = localCoordState;

  const cityList: City[] = [];

  const [userAddress, setUserAddress] = useState<string>("");

  const handleSetUserAddress = (event: any) => {
    const newAddress = event.target.value;
    console.log("address " + newAddress);
    setUserAddress(newAddress);
  };

  const handleFormSubmit = (event: any) => {
    setLoaded(true)
    event.preventDefault();
    getCoords(userAddress).then((result) => {
      //TODO: Add error handing after form submit
    });
  };



  async function getCoords(userAddress: string) {
    const addressData = await post("/api/address/search", { userAddress });

    console.log("RES", addressData);
    //if addressData.validAddress - if the geocode api search does not return a result, this will be false
    if (addressData.validAddress) setCoord(addressData.newAddress.coords);
    if (!addressData.validAddress) console.log('that is not a valid address')
    // setCoord(addressData.newAddress.coords);
    console.log('coordValue', coordValue);

    //TODO HERE ---
    console.log('address', addressData)
    
  }

  return (
    <>
      <form className="px-4 form">
        {/* JUST POC , THIS IS HOW TO CONSUME */}

        {/* <h1> {user?.email}</h1> */}
       
          <input
            className="w-small py-1 pl-3 pr-2 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
            value={userAddress}
            name="userAddress"
            onChange={handleSetUserAddress}
            type="text"
            placeholder="Enter an address"
          />
          <button
            className="bg-white text-gray-600 px-2 py-1 rounded-lg mt-2 hover:bg-stone-200 ml-2"
            onClick={handleFormSubmit}
          >
            submit
          </button>
          <div className="float-right">
          <Categories />
          </div>
      </form>
      {loaded?
      <SecondarySearchBar></SecondarySearchBar>
      :
      <div></div>
      }
      
    </>
    
    
  );
}
