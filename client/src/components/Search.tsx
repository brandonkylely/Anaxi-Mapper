// https://developers.google.com/maps/documentation/javascript/places#place_searches

import React, {useState} from "react";


export default function AddressSearch() {
    const [userAddress, setUserAddress] = useState('');

    const handleSetUserAddress = (event: any) => {
        const newAddress = event.target.value
        console.log('address ' + newAddress)
        setUserAddress(newAddress) 
    }

    const handleFormSubmit = (event: any) => {
        getCoords(userAddress).then((result) => {
            event.preventDefault();
            console.log(result)
            // return result.json();
            // alert(`${apiFetch(result)}`);
        })
      };

    function getCoords(userAddress: string) {
        let requestUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${userAddress}&key=${import.meta.env.VITE_APIKEY}`;
        console.log('fetching')
        return fetch(requestUrl).then((result) =>  result.json())
      }

    return <>
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
}