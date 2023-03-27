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
    //this is the individual search result, maybe find a way to put each item in an accordion? something collapsable
    return (
      <li className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
        <div className="container flex justify-around">
          <div className="font-righteous m-4 bg-white border border-gray-200 rounded-lg shadow p-4">
            <h1 className="font-bold">{search.name}</h1>
            <p>{search.vicinity}</p>
            {search.photos ? (
              <img
                src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${
                  search.photos[0].photo_reference
                }&key=${import.meta.env.VITE_APIKEY}`}
                alt="restaurant"
                className="h-56"
              />
            ) : (
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                alt="No Image Available"
                className="h-56"
              />
            )}
            <p>Rating: {search.rating}</p>
            <p>Price Level: {search.price_level}</p>
          </div>
        </div>
      </li>
    );
  }

  function SearchList({ searches }) {
    //this is the main body of the page
    return (
      <div>
        <h6 className="mb-4 text-3xl font-light tracking-tight text-gray-900 dark:text-white">
          Favorite Searches
        </h6>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favoriteValue.map((favorite, index) => (
            <div>
              <Disclosure>
                <Disclosure.Button>{favorite.address}</Disclosure.Button>

                {/* <h1>{favorite.radius}</h1>
                <h1>{favorite.type}</h1> */}
                <Disclosure.Panel>
                  {favoriteValue[index].search.map((search, index) => (
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
