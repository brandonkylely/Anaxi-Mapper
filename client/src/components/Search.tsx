// https://developers.google.com/maps/documentation/javascript/places#place_searches

import React, { MouseEventHandler, useState } from "react";

type City = {
  address: string;
  coords: {
    lat: number;
    lon: number;
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
      lon: number;
    };
  };
  place_id: string;
};

type GeoLocationResult = {
  results: GeoLocation[];
};


export default function AddressSearch() {
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
        lon: cityData.results[0].geometry.location.lon,
      },
      place_id: cityData.results[0].place_id,
    };

    // cityList.push(city)
    // return city

    // return cityData.json()

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
          onChange={handleSetUserAddress}
          type="text"
          placeholder="Enter an address"
        />
        <button type="button" onClick={handleFormSubmit}>
          Submit
        </button>
      </form>
    </>
  );
}
