// https://developers.google.com/maps/documentation/javascript/places#place_searches

import React, { useState } from "react";

export default function AddressSearch() {
  const [userAddress, setUserAddress] = useState("");

  const handleSetUserAddress = (event: any) => {
    const newAddress = event.target.value;
    console.log("address " + newAddress);
    setUserAddress(newAddress);
  };

  const handleFormSubmit = (event: any) => {
    getCoords(userAddress).then((result) => {
      event.preventDefault();
      console.log(result);
      // return result.json();
      // alert(`${apiFetch(result)}`);
    });
  };

  function getCoords(userAddress: string) {
    let requestUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${userAddress}&key=${
      import.meta.env.VITE_APIKEY
    }`;
    console.log("fetching");
    return fetch(requestUrl).then((result) => result.json());
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
        <div className="">
          <input className="w-small py-1 pl-3 pr-2 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
            value={userAddress}
            name="userAddress"
            onChange={handleSetUserAddress}
            type="text"
            placeholder="Enter an address"
          />
          <button className="bg-white text-gray-600 px-2 py-1 rounded-lg mt-2 hover:bg-stone-200 ml-2" onClick={handleFormSubmit}>
            submit
          </button>
        </div>
      </form>
    </>
  );
}
