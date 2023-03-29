// @ts-nocheck
import React, {useEffect} from "react";
import Favorite from "../favorites/Favorite";

import Comments from "../comments/Comments";
import CommentsList from "../comments/CommentsList";
import { useAtomValue, useAtom, useSetAtom } from "jotai";
import {
  nearbyPlacesAtom,
  addressAtom,
  nextPageAtom,
  userAtom,
  currentParamsAtom,
  destinationIDAtom,
  originIDAtom,
  encodedPolylineAtom,
  mapReloadAtom
} from "../../state";
import axios from "axios";
import {post} from "../../api"

export default function NearbySearchResults() {
  const searchResults = useAtomValue(nearbyPlacesAtom);
  const address = useAtomValue(addressAtom);
  const user = useAtomValue(userAtom);
  const currentParams = useAtomValue(currentParamsAtom);
  const [destinationIDValue, setDestinationIDValue] = useAtom(destinationIDAtom)
  const [originIDValue, setOriginIDValue] = useAtom(originIDAtom)
  const [encodedPolylineValue, setEncodedPolylineValue] = useAtom(encodedPolylineAtom)
  const setMapReload = useSetAtom(mapReloadAtom)

  async function getDirections(originIDValue: string, destinationIDValue: string) {
    // console.log(originIDValue + " " + destinationIDValue)
    try{
    const directionsData = await post("/api/address/directions", { originIDValue, destinationIDValue });
      setEncodedPolylineValue(directionsData.data.routes[0].overview_polyline.points);
      console.log(directionsData)
      setMapReload(true);
      setTimeout(() => setMapReload(false), 100);
      // return directionsData
    } catch (err) {
      console.log(err)
    }

  };

  useEffect(() => {
    if (destinationIDValue){
      getDirections(originIDValue, destinationIDValue).then((result) => {
        // console.log("get destination " + result)
      })
    }
  }, [destinationIDValue])  

  const handleSetDestinationIDValue = (event) => {
    event.preventDefault();
    setDestinationIDValue(event.target.value)
  }

  //side project, can't figure out implementation, want to generate a button that will load more results
  //should read the next page atom, and if it is true, the last search has more than 20 results
  //this means we can make a different api search call, with the same parameters, feeding it the next page token at the end
  //would be cool but too time consuming
  //token is returned from the secondary search results

  //   const handleNextPageButtonLoad(event: any) => {
  //     //set the atom to true
  //     setLoadNextPage(false);
  //     console.log("button should be loading")
  //   }
  //is set in the secondary search bar, if true, load a button that will make an api call and then set to false

  // console.log("searchResults", searchResults);
  const place_id = searchResults[0].place_id;
  const id = searchResults[0]._id;

  const handleFormSubmit = (event: any) => {
    let userEmail = user.email;
    console.log("logging user email", userEmail);
    event.preventDefault();
    //currentParams comes from an atom set at secondarysearch bar line 180
    axios.post("/api/favorite/addToFavorite", {
      searchResults,
      currentParams,
      userEmail,
    });
  };
  return (
    <>
    <div className="font-righteous px-4">Route active: {encodedPolylineValue? "Active!" : "No route active."}</div>
    <div className="font-righteous px-4">Origin ID: {originIDValue? originIDValue : "No origin selected."}</div>
    <div className="font-righteous px-4">Destination ID: {destinationIDValue? destinationIDValue : "No destination selected."}</div>
      <div className="container flex justify-between">
        <div className="font-righteous m-4 bg-white border border-gray-200 rounded-lg shadow p-4">
          <Favorite id={id} place_id={place_id} address={address} />
          <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            {address}
          </h5>
          <h6 className="mb-4 text-2xl font-light tracking-tight text-gray-900 dark:text-white">
            Nearby Results
          </h6>
          <div className="text-xl flex flex-wrap columns-3 font-fuzzy-bubbles text-gray-700 dark:text-gray-400">
            {searchResults.map((result) => (
              <div className=" w-full m-3 p-4 border border-gray-200 rounded-lg shadow" key={result.place_id} id={result.place_id}>
                <ul>
                  <li>
                    <h1 className="font-bold">{result.name}</h1>
                    <div className="py-4">
                      {result.photos ? (
                        <img
                          src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${
                            result.photos[0].photo_reference
                          }&key=${import.meta.env.VITE_APIKEY}`}
                          alt="restaurant"
                          className="h-56"
                        />
                      ) : <img src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" alt="No Image Available" className="h-56" />}

                    </div>
                  </li>
                  <li>Rating: {result.rating? result.rating : "No ratings available!"}</li>
                  <li>Pricing Level: {result.price_level? result.price_level : "No price level available!"}</li>
                </ul>
                <form action="">
                  <button
                    className="font-fuzzy-bubbles w-80 h-12 text-md text-gray-600 py-auto rounded-lg mt-2 bg-blue-400 bg-opacity-10 transition-all ease-out duration-300 hover:scale-110 hover:bg-blue-400 hover:bg-opacity-30"
                    value={result.place_id}
                    onClick={handleSetDestinationIDValue}
                    >
                      Route to this location  
                  </button>
                </form>
              </div>
            ))}
          </div>
          <form className="flex flex-col">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleFormSubmit}
            >
              Save Search to Favorites?
            </button>
          </form>
          {/* {loadNextPage ? <NextPageButton></NextPageButton>} */}
          <Comments />
        </div>
      </div>
    </>
  );
}
