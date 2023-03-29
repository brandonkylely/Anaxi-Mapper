//@ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Disclosure } from "@headlessui/react";

//TODO: need to refactor code to take the entire favorites array and not just a single search result
//Need to add a remove from favorites button that will remove entire searches from the favorites list
//give user a way to remove individual items from a search result on the list

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
        console.log(response.data.favorites, "response");
        setFavoriteValue(response.data.favorites); //right now this is only being set to a single search result from favorites, need to refactor code to take the entire favorites
        setLocalLoader(true);
      } else {
        alert("Failed to get list");
      }
    });
  };

  //also need a clear way to seperate each individual result from SearchItem into its own accordion
  function SearchItem({ search }) {
    return (
      <li className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
        <div className="container mx-auto max-w-md p-4 bg-red-600">
          <div className="bg-yellow-300 border border-gray-200 rounded-lg shadow p-4">
            <h1 className="text-2xl font-bold mb-2">{search.name}</h1>
            <p className="text-gray-600 mb-4">{search.vicinity}</p>
            {search.photos ? (
              <img
                src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${
                  search.photos[0].photo_reference
                }&key=${import.meta.env.VITE_APIKEY}`}
                alt="restaurant"
                className="w-full rounded-lg shadow"
              />
            ) : (
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                alt="No Image Available"
                className="w-full rounded-lg shadow"
              />
            )}
            <p className="text-gray-600 mt-4">Rating: {search.rating}</p>
            <p className="text-gray-600">Price Level: {search.price_level}</p>
          </div>
        </div>
      </li>
    );
  }

  function SearchList({ searches }) {
    return (
      <div>
        <div className="rounded-full bg-sky-500 my-8">
          <h1 className="text-3xl font-bold mb-4 text-center">
            Favorite Searches
          </h1>
        </div>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favoriteValue.map((favorite, index) => (
            <div key={index} className="mb-4">
              <Disclosure>
                <Disclosure.Button className="w-full text-center bg-gray-800 hover:bg-gray-200 p-4 rounded-lg font-bold text-red-800">
                  {favorite.address}
                </Disclosure.Button>
                <Disclosure.Panel className="bg-gray-900 rounded-lg shadow p-4 mt-2">
                  {favorite.search.map((search, index) => (
                    <SearchItem key={index} search={search} />
                  ))}
                </Disclosure.Panel>
              </Disclosure>
            </div>
          ))}
        </ul>
      </div>
    );
  }

  function noFavorites() {
    return (
      <div className="container mx-auto max-w-md p-4">
        <div className="bg-white border border-gray-200 rounded-lg shadow p-4">
          <h1 className="text-2xl font-bold mb-2">No Favorites</h1>
          <p className="text-gray-600">
            Click the heart to add a place to your favorites!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mx-3">
        {localLoader ? <SearchList searches={favoriteValue} /> : <div></div>}
      </div>

      <div className="container flex justify-around">
        {!localLoader ? noFavorites() : <div></div>}
      </div>
    </div>
  );
}
