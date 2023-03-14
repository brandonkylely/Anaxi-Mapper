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
  const localCoordState = useContext(coordState)

  if  (!localCoordState) {
    return <></>
  }
  const {currentCoords, setCurrentCoords} = localCoordState

  const cityList: City[] = []

  const [userAddress, setUserAddress] = useState<string>("");

  const handleSetUserAddress = (event: any) => {
    const newAddress = event.target.value;
    console.log("address " + newAddress);
    setUserAddress(newAddress);
  };

  const handleFormSubmit: MouseEventHandler = (event) => {
    getCoords(userAddress).then((result) => {
      event.preventDefault()
      console.log(result);
      // return result.json();
      // alert(`${apiFetch(result)}`);
    });
  };

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
    console.log(city)
    setCurrentCoords(city.coords)

    // cityList.push(city)
    console.log(cityData)
    // console.log(cityList)
    // return city


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
          value={userAddress}
          name="userAddress"
          onChange= {handleSetUserAddress}
          type="text"
          placeholder="Enter an address"
        />
        <button type="button" onClick={handleFormSubmit}>
          Submit
        </button>
        { currentCoords.lat }, { currentCoords.lng }
      </form>
    </>
  );
}
