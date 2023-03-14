// https://developers.google.com/maps/documentation/javascript/places#place_searches

import { MouseEventHandler, useState, useContext } from "react";
import coordState from "../state";

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

export default function AddressSearch() {
  const localCoordState = useContext(coordState);

  if (!localCoordState) {
    return <></>;
  }
  const { currentCoords, setCurrentCoords } = localCoordState;

  const cityList: City[] = [];

  const [userAddress, setUserAddress] = useState<string>("");

  const handleSetUserAddress = (event: any) => {
    const newAddress = event.target.value;
    console.log("address " + newAddress);
    setUserAddress(newAddress);
  };

  const handleFormSubmit: MouseEventHandler = (event) => {
    getCoords(userAddress).then((result) => {
      event.preventDefault();
      console.log(result);
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
    let requestUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${userAddress}&key=${
      import.meta.env.VITE_APIKEY
    }`;
    let res = await fetch(requestUrl);
    const cityData = (await res.json()) as GeoLocationResult;

    let city: City = {
      address: cityData.results[0].formatted_address,
      coords: {
        lat: cityData.results[0].geometry.location.lat,
        lng: cityData.results[0].geometry.location.lng,
      },
      place_id: cityData.results[0].place_id,
    };
    console.log(city);
    // setCurrentCoords(city.coords)

    // cityList.push(city)
    // console.log(cityData)
    // console.log(cityList)
    // return city

    let nextUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
      city.coords.lat
    },${city.coords.lng}&radius=15000&type=restaurant&keyword=asian&key=${
      import.meta.env.VITE_APIKEY
    }`;
    //temporarilty hardcoding Radius, Type, and Keyword, but these will be selectable
    let res2 = await fetch(nextUrl);

    const nearbySearch = (await res2.json()) as unknown;
    console.log(nearbySearch);
    // return cityData;

    // try {
    //   let coords = cityData.json();
    //   return coords
    // } catch (error) {
    //   console.error(error);
    // }
    // console.log('fetching')
  }

  return (
    <>
      <form className="form">
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
          type="button"
          onClick={handleFormSubmit}
        >
          Submit
        </button>
        {currentCoords.lat}, {currentCoords.lng}
      </form>
    </>
  );
}
