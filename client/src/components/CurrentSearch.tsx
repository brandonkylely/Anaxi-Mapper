import React from "react";
import Favorite from "./FavoriteList/Favorite";
import FavoriteList from "./FavoriteList/FavoriteList";
import Comments from "./CommentForm/Comments";
import CommentsList from "./CommentForm/CommentsList";
import { useAtomValue } from "jotai";
import { currentSearchAtom, addressAtom } from "../state";

export default function CurrentSearch() {
    const searchResults = useAtomValue(currentSearchAtom);
    const address = useAtomValue(addressAtom);
    return (
        <>
    <div className="columns-2 flex">      
            <div className="w-full m-4 bg-white border border-gray-200 rounded-lg shadow p-4">
                <h2>Current Search Component!</h2>
                <h2>{address}</h2>
                
                
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Lorem Ipsum</h5>
                
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc finibus venenatis odio, commodo laoreet ex blandit eu. </p>
                


            </div>

            
    </div>
        </>
    );
} 