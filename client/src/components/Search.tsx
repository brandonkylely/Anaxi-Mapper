// https://developers.google.com/maps/documentation/javascript/places#place_searches

import React, {useState} from "react";


export default function AddressSearch() {
    let [userAddress, setUserAddress] = useState('');
    let handleSetUserAddress = (event: any) => {
        const newAddress = event.value
        console.log('address accepted' + newAddress)
        return setUserAddress(newAddress) 
    }
    const handleFormSubmit = (event: any, userAddress: string) => {
        let coords = getCoords(userAddress).then((result) => {
            console.log('coords' + result)
            event.preventDefault();
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
          placeholder="Address"
        />
        <button type="button" onClick={handleFormSubmit}>
          Submit
        </button>
      </form>
    </>
}