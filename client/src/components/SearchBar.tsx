// https://developers.google.com/maps/documentation/javascript/places#place_searches

import { MouseEventHandler, useState, useContext } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { coordinateAtom, userAtom } from "../state";
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
    event.preventDefault();
    getCoords(userAddress).then((result) => {
      // console.log(result)
      // return result.json();
      // alert(`${apiFetch(result)}`);
    });
  };

  // search address, map with nothing, save
  // second search, with filters, map pops up with businesses in area
  // favorite list: [{searchAddress}, ...]
  // searchAddress =
  //   [
  //     {
  //       business result 1
  // display: boolean
  //     },
  //     {
  //       result 2
  //     }
  //   ]
  // api req: find result where type= restaurant, set display = false

  async function getCoords(userAddress: string) {
    // nearbySearch(requestUrl);
    //take this requestUrl
    //push it to back end
    //make the api calls

    //push up data to database
    //pull the placeIds from all the places within the nearby search
    //feed those into a distanceMatrix Api call
    //calculate distance/duration from origin to each point on the distance matrix
    //turn that combined data into a new object
    //

    const addressData = await post("/api/address/search", { userAddress });

    console.log("RES", addressData);
    setCoord(addressData);

    console.log('coordValue', coordValue);

    //TODO HERE ---
    console.log('address lat and lng', addressData.lat, addressData.lng)
    // setCurrentCoords({ lat: addressData.lat, lng: addressData.lng });

    // let address: City = {
    //   address: addressData.formatted_address,
    //   coords: {
    //     lat: addressData.geometry.location.lat,
    //     lng: addressData.geometry.location.lng,
    //   },
    //   place_id: addressData.place_id,
    // };

    // console.log("logging address", address);

    // let resSend = await fetch('/api/address',
    // {
    //   method:"POST",
    //   headers:
    //   body: address
    // }

    // )
    // setCurrentCoords(address.coords)

    // cityList.push(address)
    // console.log(addressData)
    // console.log(cityList)
    // return city

    // let nextUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.748817,-73.985428&radius=15000&type=restaurant&keyword=asian&key=AIzaSyBkMHNxpBmBMaHhnlpHHy63cRktfgiFXIA`;
    // //temporarilty hardcoding Radius, Type, and Keyword, but these will be selectable
    // let res2 = await fetch(nextUrl);

    // const nearbySearch = (await res2.json()) as unknown;
    // console.log(nearbySearch);
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
      <SecondarySearchBar></SecondarySearchBar>
      
    </>
    
    
  );
}
