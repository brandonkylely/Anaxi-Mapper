import React, { useEffect, useState } from "react";
import axios from "axios";
// import { useAtomValue, useSetAtom } from 'jotai';
// import { favoriteAtom, addressAtom } from '../../state';

// @ts-ignore
// let dataArray = [];

function Favorite(props) {
  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  // const setFavList = useSetAtom(favoriteAtom);
  // const favList = useAtomValue(favoriteAtom)

  const variable = {
    //TODO: need to fill in the variable
    _id: localStorage.getItem("_id"),
    place_id: props.place_id,
    address: props.address,
    //category: props.category,
  };

  useEffect(() => {
    // console.log('variable', variable)
    // axios.post('/api/favorite/favoriteNumber', variable)
    //     .then(response => {
    //         if (response.data.success) {
    //             setFavoriteNumber(response.data.favoriteNumber)
    //             console.log('favoriteNumber', response.data.favoriteNumber)
    //         } else {
    //             alert('Failed to get favorite Number')
    //         }
    //     })
    // axios.post('/api/favorite/favorited', variable)
    //     .then(response => {
    //         if (response.data.success) {
    //             setFavorited( response.data.favorited)
    //             console.log('it is favorited');
    //         } else {
    //             alert('Failed to get favorite info')
    //         }
    //     })
    // dataArray.push(variable)
    // setFavList(dataArray)
    // console.log(favList)
  }, []);

  const onClickFavorite = () => {
    if (Favorited) {
      // When it's already added to favorite, we need to remove it
      axios
        .post("/api/favorite/removeFromFavorite", variable)
        .then((response) => {
          if (response.data.success) {
            setFavoriteNumber(FavoriteNumber - 1);
            setFavorited(!Favorited);
          } else {
            alert("Failed to remove from favorite");
          }
        });
    } else {
      // When it's not added to favorite, we need to add it
      axios.post("/api/favorite/addToFavorite", variable).then((response) => {
        if (response.data.success) {
          setFavoriteNumber(FavoriteNumber + 1);
          setFavorited(!Favorited);
          //Add data to favorite list

          console.log("location added", response);
        } else {
          alert("Failed to add to favorite");
        }
      });
    }
  };

  return (
    <button
      onClick={onClickFavorite}
      type="button"
      className="text-gray-900 bg-white border float-right border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
    >
      Add to Favorite
    </button>
  );
}

export default Favorite;
