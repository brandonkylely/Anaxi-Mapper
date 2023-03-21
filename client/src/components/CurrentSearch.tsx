
import React from "react";
import Favorite from "./FavoriteList/Favorite";
import FavoritePage from "../pages/FavoritePage";
import Comments from "./CommentForm/Comments";
import CommentsList from "./CommentForm/CommentsList";
import { useAtomValue } from "jotai";
import { currentSearchAtom, addressAtom } from "../state";


export default function CurrentSearch() {
    const searchResults = useAtomValue(currentSearchAtom);
    const address = useAtomValue(addressAtom);

    const place_id = searchResults[0].place_id;
    const id = searchResults[0]._id;
    return (
        <>
    <div className="container flex justify-between">      
            <div className="m-4 bg-white border border-gray-200 rounded-lg shadow p-4">
               <Favorite id={id} place_id={place_id} address={address} />
               {/* <Favorite id={result.id} place_id={result.place_id} address={result.address} /> */}
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{address}</h5>
                <h6 className="mb-4 text-lg font-light tracking-tight text-gray-900 dark:text-white">Nearby Results</h6>
                <div className="flex flex-wrap columns-3 font-normal text-gray-700 dark:text-gray-400">
                    {searchResults.map((result) => (
                    <div className=" w-full m-3 p-4 border border-gray-200 rounded-lg shadow"> 
                        <ul>
                            <li key={result.id}>
                                <h1 className="font-bold">{result.name}</h1>
                                <div className="py-4">
                                    {result.photos && (
                                    <img
                                        src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${result.photos[0].photo_reference}&key=import.meta.env.VITE_APIKEY`}
                                        alt="restaurant"
                                    />
                                )}
                                </div>

                            </li>
                            <li key={result.id}>
                                Rating: {result.rating}
                            </li>
                            <li key={result.id}>
                                Pricing Level: {result.price_level}
                            </li>
                            
                            
                        </ul>
                    </div>
                        ))}
                </div>
                
                <Comments />

            </div>

            
    </div>
        </>
    );
} 