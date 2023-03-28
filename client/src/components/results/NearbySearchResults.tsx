// @ts-nocheck
import React from "react";
import Favorite from "../favorites/Favorite";

import Comments from "../comments/Comments";
import CommentsList from "../comments/CommentsList";
import { useAtomValue, useAtom } from "jotai";
import {
  nearbyPlacesAtom,
  addressAtom,
  nextPageAtom,
  userAtom,
  currentParamsAtom,
} from "../../state";
import axios from "axios";

export default function NearbySearchResults() {
  const searchResults = useAtomValue(nearbyPlacesAtom);
  const address = useAtomValue(addressAtom);
  const user = useAtomValue(userAtom);
  const currentParams = useAtomValue(currentParamsAtom);
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
  console.log("searchResults", searchResults);
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
              <div className=" w-full m-3 p-4 border border-gray-200 rounded-lg shadow" key={result.place_id}>
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
