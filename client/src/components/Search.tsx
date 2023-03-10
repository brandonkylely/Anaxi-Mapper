// https://developers.google.com/maps/documentation/javascript/places#place_searches

import React, {useState} from "react";


export default function AddressSearch() {
    const [userAddress, setUserAddress] = useState('');

    const handleSetUserAddress = (event: any) => {
        const newAddress = event.target.value
        console.log(userAddress)
        console.log('address ' + newAddress)
        setUserAddress(newAddress) 
        console.log(userAddress)
    }
    const handleFormSubmit = (event: any) => {
        getCoords(event.target.value).then((result) => {
            event.preventDefault();
            console.log('coords ' + result)
            // return result.json();
            // alert(`${apiFetch(result)}`);
        })
      };

    function getCoords(userAddress: any) {
        let requestUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${userAddress}&key=${import.meta.env.VITE_APIKEY}`;
        console.log('fetching')
        return fetch(requestUrl).then((result) => {console.log(result)})
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