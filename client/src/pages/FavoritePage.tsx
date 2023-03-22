import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAtomValue } from 'jotai';
import { favoriteAtom, addressAtom } from '../state';
  // @ts-ignore


function FavoritePage(props) {
    //const favList = useAtomValue(favoriteAtom);
    //console.log('favList',favList)
    
    const [FavoritePlaces, setFavoritePlaces] = useState([])

    
    const variable = { 
                id: props._id,
                place_id: props.place_id,
                address: props.address,
        }
    
    useEffect(() => {
        
        fetchFavoritePlaces()
        
    }, [])

    const fetchFavoritePlaces = () => {
        axios.post('/api/favorite/getFavoritePlaces', variable)
            .then(response => {
                if (response.data.success) {
                    setFavoritePlaces(response.data.favorites)
                } else {
                    alert('Failed to get list')
                }
            })
    }
    
    const onClickRemove = (place_id) => {
        const variable = {
            place_id: place_id,
            address: props.address,
        }
        axios.post('/api/favorite/removeFromFavorite', variable)
            .then(response => {
                if (response.data.success) {
                    setFavoritePlaces(FavoritePlaces.filter(place => place.place_id !== place_id))
                } else {
                    alert('Failed to remove from favorite')
                }
            })
    }

    const renderTableBody = FavoritePlaces.map((result) => {
        return <tr key={result.id}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {result.address}
                </th>
                {/* <td className="px-6 py-4">
                    {result.category}
                </td> */}
                <td className="px-6 py-4">
                    <button onClick={() => onClickRemove(result.place_id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Remove</button>
                </td>
            </tr>
    })
            
    return (
    <div className="container flex place-content-center xy-40">
       <div className="m-4 bg-white border border-gray-200 rounded-lg shadow p-4">
        
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Location
                        </th>
                        {/* <th scope="col" class="px-6 py-3">
                            Category
                        </th> */}
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {renderTableBody}
                </tbody>
            </table>
        </div>
    </div>
    )
}

export default FavoritePage;