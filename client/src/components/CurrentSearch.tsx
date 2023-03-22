import React from "react";
import Favorite from "./FavoriteList/Favorite";
import FavoritePage from "../pages/FavoritePage";
import Comments from "./CommentForm/Comments";
import CommentsList from "./CommentForm/CommentsList";
import { useAtomValue, useAtom } from "jotai";
import {
  currentSearchAtom,
  addressAtom,
  nextPageAtom,
  userAtom,
  currentParamsAtom,
} from "../state";
import axios from "axios";

export default function CurrentSearch() {
  const searchResults = useAtomValue(currentSearchAtom);
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
  //@ts-ignore
  const place_id = searchResults[0].place_id;
  //@ts-ignore
  const id = searchResults[0]._id;

  const handleFormSubmit = (event: any) => {
    //@ts-ignore
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
        <div className="m-4 bg-white border border-gray-200 rounded-lg shadow p-4">
          <Favorite id={id} place_id={place_id} address={address} />
          {/* <Favorite id={result.id} place_id={result.place_id} address={result.address} /> */}
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {address}
          </h5>
          <h6 className="mb-4 text-lg font-light tracking-tight text-gray-900 dark:text-white">
            Nearby Results
          </h6>
          <div className="flex flex-wrap columns-3 font-normal text-gray-700 dark:text-gray-400">
            {searchResults.map((result) => (
              <div className=" w-full m-3 p-4 border border-gray-200 rounded-lg shadow">
                <ul>
                  <li key={result.id}>
                    <h1 className="font-bold">{result.name}</h1>
                    <div className="py-4">
                      {result.photos && (
                        <img
                          src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${
                            result.photos[0].photo_reference
                          }&key=${import.meta.env.VITE_APIKEY}`}
                          alt="restaurant"
                        />
                      )}
                    </div>
                  </li>
                  <li key={result.id}>Rating: {result.rating}</li>
                  <li key={result.id}>Pricing Level: {result.price_level}</li>
                </ul>
              </div>
            ))}
          </div>
          <form className="flex flex-col">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleFormSubmit}
            >
              Save to Favorites
            </button>
          </form>
          {/* {loadNextPage ? <NextPageButton></NextPageButton>} */}
          <Comments />
        </div>
      </div>
    </>
  );
}
