//@ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SearchList() {
  const [localLoader, setLocalLoader] = useState(false);
  const [favoriteValue, setFavoriteValue] = useState([]); //need error checking in case user has not added anything to favorites

  useEffect((): void => {
    fetchFavorites();
    console.log(favoriteValue);
  }, [localLoader]);

  const fetchFavorites = () => {
    const userId = localStorage.getItem("userId");
    axios.get(`/api/favorite/getFavoritePlaces/${userId}`).then((response) => {
      if (response.data.success) {
        console.log(response.data.favorites[0].search, "response");
        setFavoriteValue(response.data.favorites[0].search); //right now this is only being set to a single search result from favorites, need to refactor code to take the entire favorites
        setLocalLoader(true);
      } else {
        alert("Failed to get list");
      }
    });
  };

  //also need a clear way to seperate each individual result from SearchItem into its own accordion
  function SearchItem({ search }) {
    //this is the individual search result, maybe find a way to put each item in an accordion? something collapsable
    return (
      <li className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
        <div className="container flex justify-around">
          <div className="font-righteous m-4 bg-white border border-gray-200 rounded-lg shadow p-4">
            <h1 className="font-bold">{search.name}</h1>
            <p>{search.vicinity}</p>
            <img src={search.photos[0].photo_reference} alt={search.name} />
            <p>Rating: {search.rating}</p>
            <p>Price Level: {search.price_level}</p>
          </div>
        </div>
      </li>
    );
  }

  //searches structure
  [
    {
      //this object would be favoriteValue[0]
      coords: {
        //coords of origin point
        lat: 33.7174708,
        lng: -117.8311428,
      },
      search: [], //array of search results --> this will make up the main body of a single favorited item, everything else will be a header
      address: "Orange County, CA, USA", //address of origin point
      radius: 20000, //radius of search
      type: "restaurant", //type parameter of search
      _id: "641a32cfe2532a6abae760c1",
    },
  ];
  function SearchList({ searches }) {
    //this is the main body of the page
    return (
      <div>
        <h6 className="mb-4 text-3xl font-light tracking-tight text-gray-900 dark:text-white">
          Favorite Searches
        </h6>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favoriteValue.map((search, index) => (
            <div>
              <SearchItem key={index} search={search} />
            </div>
          ))}
        </ul>
      </div>
    );
  }

  function noFavorites() {
    return (
      <div className="container flex justify-around">
        <div className="font-righteous m-4 bg-white border border-gray-200 rounded-lg shadow p-4">
          <h1 className="font-bold">No Favorites</h1>
          <p>Click the heart to add a place to your favorites!</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="container flex justify-around">
        {localLoader ? <SearchList searches={favoriteValue} /> : <div></div>}
      </div>

      <div className="container flex justify-around">
        {!localLoader ? noFavorites() : <div></div>}
      </div>
    </div>
  );
}
