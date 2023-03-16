// https://developers.google.com/maps/documentation/javascript/places#place_searches

import { MouseEventHandler, useState, useContext } from "react";
import { useAtomValue } from "jotai/react";
import { userAtom } from "../state";
import coordState from "../state";
import { nearbySearch } from "../api";

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
  const { currentCoords, setCurrentCoords } = useContext(coordState);

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

  const handleFormSubmit: MouseEventHandler = (event) => {
    console.log('running handleFormSubmit');
    getCoords(userAddress).then((result) => {
      event.preventDefault();
      console.log('logging the input userAdress', userAddress);
      console.log('logging result of getCoords', result);
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

    let requestUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${userAddress.replace(" ", "+")}&key=${
      import.meta.env.VITE_APIKEY
    }`;
    
    let res = await fetch(requestUrl);
    console.log('its broken')
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


    const cityData = (await res.json()) as GeoLocationResult;
    console.log('logging cityData', cityData);
    let city: City = {
      address: cityData.results[0].formatted_address,
      coords: {
        lat: cityData.results[0].geometry.location.lat,
        lng: cityData.results[0].geometry.location.lng,
      },
      place_id: cityData.results[0].place_id,
    };
    console.log('logging city', city);
    // setCurrentCoords(city.coords)

    // cityList.push(city)
    // console.log(cityData)
    // console.log(cityList)
    // return city

    let nextUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.748817,-73.985428&radius=15000&type=restaurant&keyword=asian&key=AIzaSyBkMHNxpBmBMaHhnlpHHy63cRktfgiFXIA`;
    //temporarilty hardcoding Radius, Type, and Keyword, but these will be selectable
    let res2 = await fetch(nextUrl);

    const nearbySearch = (await res2.json()) as unknown;
    console.log(nearbySearch);
   
  }

  return (
    <>
      {/* <form className="form">
        <input
          value={userAddress}
          name="userAddress"
          onChange={handleSetUserAddress}
          type="text"
          placeholder="Enter an address"
        />
        <button type="button" onClick={handleFormSubmit}>
          Submit
        </button>
      </form> */}
      <form className="max-w-sm px-4 form ">
        {/* JUST POC , THIS IS HOW TO CONSUME */}
        <h1> {user?.email}</h1>
        <div className="">
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
        </div>
      </form>
    </>
  );
}
