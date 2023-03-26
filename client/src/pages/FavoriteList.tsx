//@ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAtomValue, useAtom, useSetAtom } from "jotai";
import { favoriteAtom, addressAtom } from "../state";

// type FavoritePlace = {
//   place_id: string;
//   // ...add more later
// };

// type FavoriteProps = {
//   _id: string;
//   place_id: string;
//   address: string;
// };

// props: FavoriteProps
export default function FavoriteList() {
  const [favoriteValue, setFavoriteValue] = useAtom(favoriteAtom);
  const [localLoader, setLocalLoader] = useState(false);

  //const favList = useAtomValue(favoriteAtom);
  //console.log('favList',favList)

  // const [FavoritePlaces, setFavoritePlaces] = useState([]);

  // const variable = {
  //   id: props._id,
  //   place_id: props.place_id,
  //   address: props.address,
  // };

  function ListItems() {
    favoriteValue.forEach((favorite) => (
      <div key={favorite._id}>
        {favorite.search.name}
        {/* <div>{favorite.search.types[0]}</div> */}
      </div>
    ))
  }
  

  useEffect((): void => {
    fetchFavorites();
    console.log(favoriteValue);

    // console.log("FAVORITE", favorite);
  }, []);

  // const fetchFavorites = () => {
  //     axios.post('/api/favorite/getFavoritePlaces', variable)
  //         .then(response => {
  //             if (response.data.success) {
  //                 setFavoritePlaces(response.data.favorites)
  //             } else {
  //                 alert('Failed to get list')
  //             }
  //         })
  // }

  const fetchFavorites = () => {
    const userId = localStorage.getItem("userId");
    axios.get(`/api/favorite/getFavoritePlaces/${userId}`).then((response) => {
      if (response.data.success) {
        setFavoriteValue(response.data.favorites);
        setLocalLoader(true);
      } else {
        alert("Failed to get list");
      }
    });
  };

  // const onClickRemove = (place_id: number) => {
  //   const variable = {
  //     place_id: place_id,
  //     address: props.address,
  //   };
  //   axios
  //     .post("/api/favorite/removeFromFavorite", variable)
  //     .then((response) => {
  //       if (response.data.success) {
  //         setFavoritePlaces(
  //           FavoritePlaces.filter((place) => place.place_id !== place_id)
  //         );
  //       } else {
  //         alert("Failed to remove from favorite");
  //       }
  //     });
  // };

  // deprecated code?
  // const renderTableBody = favorite.map((res) => {
  //   result.map((result) => {
  //     return (
  //       <tr key={result.id}>
  //         <th
  //           scope="row"
  //           className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
  //         >
  //           {result.address}
  //         </th>
  //         {/* <td className="px-6 py-4">
  //                     {result.category}
  //                 </td> */}
  //         <td className="px-6 py-4">
  //           <button
  //             onClick={() => onClickRemove(result.place_id)}
  //             className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
  //           >
  //             Remove
  //           </button>
  //         </td>
  //       </tr>
  //     );
  //   });
  // });

  return (
    <div className="container flex place-content-center xy-40">
      <div className="m-4 bg-white border border-gray-200 rounded-lg shadow p-4">
        <div className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          {/* <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Location
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead> */}
          {/* <tbody>{renderTableBody}</tbody> */}

          {/* {localLoader? <div><ListItems/>{favoriteValue[0]._id}</div> : <>localLoader off</>} */}
          {localLoader && favoriteValue.forEach((favorite, index) => (
            <div key={favorite._id}>
              item {index}: {favorite.search.name}
              {/* <div>{favorite.search.types[0]}</div> */}
            </div>))}
          {/* <div>{favoriteValue[0]._id}</div> */}
        </div>
      </div>
    </div>
  );
}



